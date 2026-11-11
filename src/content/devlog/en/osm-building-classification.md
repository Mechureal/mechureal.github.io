---
title: "Classifying Korean buildings for a delivery game"
description: "We start with the buildings found across Korea, then connect their delivery routes to OpenStreetMap and decide what the game needs to generate."
date: 2026-11-10
updated: 2026-11-11
author: Mechureal
game: broke-rider-simulator
tags: [development, map, osm]
draft: false
lang: en
translationKey: osm-building-classification
slug: osm-building-classification
---

We set out to classify the kinds of buildings found across Korea, from detached homes and neighborhood shops to apartment complexes, distribution centers and airports. In a delivery game, the type of building changes what a rider sees from the street and what they do once they reach the address.

A ground-floor restaurant and the homes above it can share an address and use different doors. A rider picking up food may walk straight in from the sidewalk. A rider delivering upstairs may use the shared door next to the shop and then look for a floor and unit number. The building classification needs to account for both journeys.

[Jump to the Korean building classification](#building-taxonomy)

## Start with the buildings found in Korea

We started with buildings we could encounter in Korea. Alongside housing and commerce, the list covers offices, accommodation, schools, hospitals, public facilities, cultural venues, places of worship, sports facilities, transport, agriculture, utilities and small outbuildings. We used Korea's statutory list of building uses to check for gaps. The game subtypes follow features riders can see from the street or encounter on the way inside. [Statutory building-use categories (in Korean)](https://www.law.go.kr/lsBylInfoPLinkR.do?bylBrNo=00&bylCls=BE&bylNo=0001&lsNm=%EA%B1%B4%EC%B6%95%EB%B2%95+%EC%8B%9C%ED%96%89%EB%A0%B9)

- **Category** describes how a building is used, such as housing, commerce or education.
- **Building type** identifies a form within that use, such as a Korean villa, apartment block or neighborhood retail building.
- **Subtype** captures a layout that changes the facade or approach, such as a villa with open ground-floor parking, a slab apartment block or a continuous row of storefronts.

Uses can vary by floor. A clinic on the second floor of a retail building may still share the building's stairs with the shops below. A school site can contain a classroom block, gymnasium and dormitory, each with its own type and entrance.

## Follow the rider from the street to the handoff

### Finding the right door in a residential building

At a detached home, a rider may go through a gate and across a yard to reach the front door. Attached homes can share a wall and have separate entrances. In a Korean villa, a low-rise apartment building, a rider looks for the shared door and then takes the stairs or lift. At an apartment complex, the rider also needs the right block and entrance.

A villa with piloti parking has an open ground floor supported by columns. The footprint needs room for vehicle access once the columns and stairwell are in place, and a clear path to the shared door when cars are parked. A villa with an enclosed ground floor can put its shared door on the street or alley. If the threshold is higher than the street, it can use outside steps and a landing. That height difference is a separate decision from whether the ground floor is open.

<figure class="building-example">
  <img src="/images/devlog/osm-building-classification/jamsil-apartments.jpg" width="1000" height="750" loading="lazy" alt="Long residential blocks with repeated windows at Jamsil Apartment Complex Phase 5 in Seoul" />
  <figcaption>Jamsil Apartment Complex Phase 5 in Seoul. Windows and balconies repeat along the long residential blocks. Photo by <a href="https://commons.wikimedia.org/wiki/File:Jamsil_Apartment_Complex_Phase_5_(5460805782).jpg">InSapphoWeTrust</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA 2.0</a>.</figcaption>
</figure>

### Picking up food at a neighborhood shop

Neighborhood shops are the starting point for food pickups. A standalone shop may open straight onto the sidewalk. Where several storefronts share an address, the rider looks for the sign and door listed on the order. A restaurant upstairs may be reached through the building's shared door and stairs or lift. Each pickup links a shop, an entrance and the counter where the rider collects the order.

Shop windows, signs and doors can be reused across storefronts. A traditional market adds a market lane, and a shopping mall can add a shared lobby or outdoor plaza. A supermarket or department store can have separate customer and loading entrances. Reusing a facade component still leaves room for different pickup routes.

<figure class="building-example">
  <img src="/images/devlog/osm-building-classification/korean-bbq-storefront.jpg" width="640" height="960" loading="lazy" alt="A restaurant sign above a door that opens onto the sidewalk in Seoul" />
  <figcaption>A Seoul restaurant with a sign above its sidewalk entrance. Photo by <a href="https://www.pexels.com/photo/entrance-to-a-korean-bbq-restaurant-18936030/">Pincalo</a>, <a href="https://www.pexels.com/license/">Pexels License</a>, resized for the web.</figcaption>
</figure>

<figure class="building-example">
  <img src="/images/devlog/osm-building-classification/restaurant-storefronts.jpg" width="1440" height="982" loading="lazy" alt="Restaurant signs and separate entrances along a Seoul alley" />
  <figcaption>A restaurant lane in Seoul. Reaching the street is followed by finding the right sign and door. Photo by <a href="https://commons.wikimedia.org/wiki/File:Walking_beneath_restaurant_signs_in_Seoul_(55614010409).jpg">Sergiy Galyonkin</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>, resized for the web.</figcaption>
</figure>

### Two routes at one address

In a building with a ground-floor shop and homes above, we can point the restaurant pickup and the residential delivery to separate doors. If both orders use a common entrance, their routes split inside. Our first planned gameplay check will compare both orders and confirm that the facade, the interior connection and the order directions all refer to the intended entrance. The door and surrounding wall use the same opening so wall collision leaves the passage clear.

<figure class="optional-image" hidden>
  <img data-optional-src="/images/devlog/osm-building-classification/building-types-and-entrances.png" alt="Concept diagram comparing entrances at a low-rise apartment building with piloti parking, one with an enclosed stairwell, and a shop with homes upstairs" />
  <figcaption>The ground-floor layout determines what the shared entrance and the shop door are used for.</figcaption>
</figure>

<h2 id="osm-evidence">Map OpenStreetMap tags to the classification</h2>

An [earlier devlog](/en/devlog/osm-to-unity/) covered importing building footprints from OpenStreetMap (OSM). We now use those records to assign the types defined above. The first question is **what the tag describes**. It may apply to the whole building, a tenant inside it or the surrounding site.

1. **Start with tags attached to the building.** `building=yes` indicates that a building exists. `building=apartments` gives us a use to work with, and `building:use` can record its current use. In Ingye, the NC Department Store in Suwon was mapped on the same OSM object as the building. Combining `building=yes` with `shop=department_store` gave us a candidate for a large retail building. [OSM building tags](https://wiki.openstreetmap.org/wiki/Key:building) · [OSM building use](https://wiki.openstreetmap.org/wiki/Key:building:use)
2. **Attach separately mapped businesses as tenants.** When a restaurant point falls inside a footprint, check that the address agrees. A `level` value applies to the tenant's floor. Likewise, a hospital or school tag can describe the site. Check the individual buildings for the roles of a parking structure or gymnasium. [OSM floor levels](https://wiki.openstreetmap.org/wiki/Key:level) · [OSM entrances](https://wiki.openstreetmap.org/wiki/Key:entrance)
3. **Use the layout to narrow the candidates once the use is known.** Floor count and footprint help distinguish a low-rise villa from a large apartment block. A long, narrow footprint suggests a slab block. Piloti parking, a dedicated shop door and an internal connection need more evidence. In Songdo, `building=mixed_use` supported a mixed-use classification while the floor-by-floor uses remained unknown.

When `building=yes` is the only building-level evidence, a surrounding residential area alone cannot establish that the building is an apartment block. If tags conflict, we keep the most specific level the evidence supports and record any appearance inferred from the footprint or floor count as a proposal.

Building tags alone supported a broad category for 720 buildings in Ingye and 1,227 in Songdo. A trial pass also considered facility tags on the same object, some facility names, floor counts and footprints. Each count below includes buildings assigned at least to that level.

- **Ingye** had 4,596 buildings. We assigned a category to 753 and a building type to 322, and proposed a facade subtype for 139.
- **Songdo** had 1,546 buildings. We assigned a category to 1,255 and a building type to 869, and proposed a facade subtype for 305.

Most subtype proposals were slab or tower apartment facades suggested by floor count and footprint. Neither extract confirmed piloti parking or separate shop and residential entrances. We track facade proposals and verified entrances separately.

## Decide what the game needs to generate

- **Frequent pickup and delivery routes** need a path from the sidewalk to the entrance, shared stairs or lifts where applicable, floor doors and a handoff point. We plan to start with homes, neighborhood shops and buildings that combine the two.
- **Large sites and restricted facilities** need the part of the route an order actually uses. That might be a hospital's public lobby or a distribution center's designated loading door. Access-controlled areas such as the far side of station fare gates and emergency-only entrances are outside ordinary delivery routes.
- **Background buildings and small structures** can use shared exterior components. Sheds, guard booths and open-sided roofs only need a route if they become an order destination. We exclude buildings under construction and closed buildings from automatically generated orders. A `building:part=*` element belongs to its parent building. [OSM building parts](https://wiki.openstreetmap.org/wiki/Key:building:part)

## Leave uncertain details open

**When we know the building type but lack evidence for a subtype**, we use a shared facade for the type. A low-rise apartment building can use repeated windows, a shared entrance and an enclosed ground floor as its default appearance. Its subtype stays open so confirmed piloti parking can replace the ground-floor treatment later.

**When we cannot determine the building use**, we leave the building unclassified and use the footprint, available height and floor count, and road orientation to generate a basic facade. Low-rise buildings use a few wall and window bays. Mid-rise buildings add bands between floors and corner pieces. High-rises repeat the window bays above a distinct base and finish at the roofline. We look at which facade faces a street and whether another building blocks it before choosing the frontage. A separately confirmed restaurant can still be attached to the building. Before it becomes a pickup location, we need to assign a floor and door and check that the route from the sidewalk reaches it.

<figure class="optional-image" hidden>
  <img data-optional-src="/images/devlog/osm-building-classification/ingye-songdo-facades.png" alt="OSM footprints and nearby roads in Ingye and Songdo alongside proposed building elevations" />
  <figcaption>The footprint and height stay in place while the window rhythm and finish respond to the street-facing wall.</figcaption>
</figure>

<h2 id="building-taxonomy">Korean building classification</h2>

Open a category to see how its building types differ. Each entry lists the subtypes and layouts, the OSM evidence to look for, and the components they can share. In the reference, `B=value` means `building=value`.

<div class="taxonomy-reference">
  <h3>Housing, retail, offices and accommodation</h3>
  <details class="taxonomy-category" id="housing">
    <summary>Housing</summary>
    <div class="taxonomy-category-content">
      <p>At an apartment complex, the block number and shared entrance come first. Slab blocks repeat windows and balconies along a long face, while tower blocks spread windows across several faces. Both can reuse window, balcony and lift modules. Dormitories can reuse repeated room bays, with approaches from campus paths or from the street.</p>
      <section class="taxonomy-item">
        <h4>Detached homes</h4>
        <p class="taxonomy-layout">Urban alley or courtyard; rural single-story; urban hanok. Use the street setback, yard and roof to distinguish them.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=house/detached/bungalow/farm</code>. Confirm hanok separately.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Wall and pitched roof, perimeter gate, yard entrance.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Attached and row houses</h4>
        <p class="taxonomy-layout">Two homes sharing a wall or a continuous row. Check shared walls and individual street access.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=semidetached_house/terrace</code>.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Repeated frontage, individual doors.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Villas and low-rise apartment buildings</h4>
        <p class="taxonomy-layout">Piloti parking or enclosed ground floor with interior stairs. An exterior approach stair is an independent option.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=apartments</code> or confirmed residential use with <code>B=residential</code>, plus low-rise dimensions and footprint. Check piloti separately.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Repeated windows and balconies, shared entrance, stairs, piloti columns and parking, exterior steps and landings.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Apartment blocks</h4>
        <p class="taxonomy-layout">Slab or tower, based on footprint proportions and core arrangement. Building age is a finish option.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=apartments</code> plus footprint and height for the individual block. The tag alone establishes apartment housing.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Repeated residential floors, block entrances, elevators, balconies.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Dormitories</h4>
        <p class="taxonomy-layout">Low-rise campus residence or standalone urban residence. Check the connection to the campus or street.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=dormitory</code> plus the relationship to its site.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Repeated room bays, shared entrance and corridor.</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="commercial">
    <summary>Commercial</summary>
    <div class="taxonomy-category-content">
      <p>Neighborhood shops use either street-facing doors or shared access to an upper floor. Markets, supermarkets and shopping malls differ in how they arrange walkways, public entrances and loading doors.</p>
      <section class="taxonomy-item">
        <h4>Neighborhood shops</h4>
        <p class="taxonomy-layout">Standalone one-story shop, continuous storefront row, or multistory retail building. Check how many doors face the street and whether upper floors share a core.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=retail/commercial/kiosk</code>. <code>shop=*</code> and <code>amenity=restaurant/cafe</code> can identify tenants.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Display windows, signs, storefront doors, shared upper-floor entrance and stairs.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Traditional markets</h4>
        <p class="taxonomy-layout">Covered market lane or indoor market building. Stalls face an outdoor lane or an interior aisle.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>amenity=marketplace</code> plus market boundary, buildings and footpaths.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Arcade canopy, repeated stall fronts, market gate and indoor aisle.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Large retailers</h4>
        <p class="taxonomy-layout">Multistory urban supermarket, warehouse store, or department store. Check sales floors, parking and loading.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=supermarket</code>, <code>shop=supermarket/department_store</code> plus dimensions and floor uses.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Large wall panels and display windows, customer lobby, parking ramps and loading doors.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Shopping malls</h4>
        <p class="taxonomy-layout">Enclosed mall or open-air retail street. Check whether visitors move between stores indoors or across an outdoor plaza.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>shop=mall</code> plus building arrangement and pedestrian connections.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Enclosed mall lobby and concourse, or outdoor plaza and repeated storefronts.</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="mixed-use">
    <summary>Mixed use</summary>
    <div class="taxonomy-category-content">
      <p>Ground-floor shops can share a building with homes or offices upstairs. Each use may have a different entrance and floor.</p>
      <section class="taxonomy-item">
        <h4>Shop houses and mixed-use buildings</h4>
        <p class="taxonomy-layout">Ground-floor shops with housing above; retail below offices or lodging; or floor uses unknown.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd>Songdo’s <code>B=mixed_use</code>, <code>building:use=multipurpose</code> or multiple uses. Specific combinations require floor and extent evidence.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Street-facing shop door and shared upper-floor entrance. Use separate doors when supported, or branch behind a documented common entrance.</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="offices">
    <summary>Offices</summary>
    <div class="taxonomy-category-content">
      <p>A small office can have a compact alley entrance, while a larger building sends visitors through a lobby to their floor. When towers share a podium, riders still need the right tower after reaching the street address. Punched windows and glazed facades can share the same lobby layout.</p>
      <section class="taxonomy-item">
        <h4>Small office buildings</h4>
        <p class="taxonomy-layout">Single alley entrance or ground-floor showroom. Check how the office door relates to the showroom.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=office</code> or evidence of office use across the building. An <code>office=*</code> point may be a single tenant.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Compact office entrance and core, showroom frontage.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>General offices</h4>
        <p class="taxonomy-layout">Punched windows in a wall grid or a glazed facade. Both can use the same lobby and entrance.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=office</code> or building-wide office use. Use facade records where available.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Wall and window panels or curtain wall, shared lobby and lifts.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>High-rise offices</h4>
        <p class="taxonomy-layout">Single tower or multiple towers on a shared base. Check how the podium connects to tower lobbies.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd>Office use with <code>height</code>, <code>building:levels</code>, <code>building:part=*</code> and relationships between blocks.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Podium, repeated tower envelope, tower-specific lobbies and cores.</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="accommodation">
    <summary>Accommodation</summary>
    <div class="taxonomy-category-content">
      <p>Hotels differ in how people reach the lobby, including whether there is a vehicle drop-off. Motels may use a common corridor or individual room garages. At resorts and multi-wing hanok stays, guests first find the right building. An order can point to a lobby or a specific room, depending on where the handoff is set.</p>
      <section class="taxonomy-item">
        <h4>Motels and inns</h4>
        <p class="taxonomy-layout">Shared alley entrance or garage access for individual rooms. Check whether guests use an internal corridor or drive to their own room.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>tourism=motel</code>. Distinguish inns using accommodation tags and facility information.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Small lobby and corridor, or numbered garage and room doors.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Hotels</h4>
        <p class="taxonomy-layout">Sidewalk entrance or covered vehicle drop-off. Check the approach to the lobby.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=hotel</code>, <code>tourism=hotel</code> plus approach and drop-off information.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Lobby and room floors, optional drop-off canopy and lane.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Resorts and condominiums</h4>
        <p class="taxonomy-layout">Rooms concentrated in one block or distributed among low-rise blocks. Check whether guests first navigate to a floor or to a building.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd>Site information such as <code>leisure=resort</code> plus accommodation buildings and room layout.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Hotel lobby and core, or site gate, block numbers and paths.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Pensions and hanok stays</h4>
        <p class="taxonomy-layout">Single-story rental house, one building with several guest rooms, or separate hanok wings around a yard.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>tourism=guest_house/apartment/chalet</code> are candidates. Confirm pension use and hanok form separately.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>House entrance and deck, room corridor, courtyard and wing entrances.</dd>
        </dl>
      </section>
    </div>
  </details>
  <h3>Production, education and community facilities</h3>
  <details class="taxonomy-category" id="industry">
    <summary>Industry and logistics</summary>
    <div class="taxonomy-category-content">
      <p>A workshop may open straight onto an alley through one shutter. A distribution center can have numbered docks and ramps for trucks. Recording the site gate separately from the receiving door lets the game distinguish a pedestrian entrance, a guard booth and a freight handoff.</p>
      <section class="taxonomy-item">
        <h4>Small workshops</h4>
        <p class="taxonomy-layout">Alley-facing shutter or loading yard. Check whether vehicles can wait between the road and the shutter.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=industrial</code> plus evidence of small-scale production. Relevant <code>craft=*</code> tags are clues.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Steel-frame panels, shutter and pedestrian door, loading yard.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Factories</h4>
        <p class="taxonomy-layout">Single production block or multiple buildings connected by site roads.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=industrial</code> plus manufacturing use. <code>landuse=industrial</code> describes the site.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Large production building, pedestrian and freight doors, guard booth and site roads.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Warehouses</h4>
        <p class="taxonomy-layout">Single-story general storage or refrigerated storage. Confirm refrigeration through facility information.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=warehouse</code>. Confirm cold storage separately.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Steel-frame panel enclosure, freight door and optional sealed dock.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Distribution centers</h4>
        <p class="taxonomy-layout">A row of ground-level docks or truck ramps to docks on several floors.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=warehouse</code> plus logistics evidence such as <code>industrial=logistics</code>. Verify ramps and docks separately.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Repeated numbered docks, truck turning area and ramp.</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="education">
    <summary>Education and research</summary>
    <div class="taxonomy-category-content">
      <p>A school or university campus can contain teaching buildings, dormitories and sports halls. A rider passes the campus gate and finds the right building, sometimes using a connector between wings. Research facilities can have a visitor lobby and a separate door for large equipment.</p>
      <section class="taxonomy-item">
        <h4>Childcare and kindergarten</h4>
        <p class="taxonomy-layout">Standalone low-rise building or a facility inside a residential complex.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=kindergarten</code>, <code>amenity=kindergarten/childcare</code> plus residential complex relationship.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Childcare building shell, gate and yard, reception entrance.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Primary and secondary schools</h4>
        <p class="taxonomy-layout">Classroom wing by a schoolyard, courtyard, or main and annex buildings joined by corridors.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=school</code>, <code>amenity=school</code> plus yard, blocks and connectors. Classify sports halls and other buildings individually.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Repeated classroom bays, school gate, building entrances and connecting corridors.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Universities</h4>
        <p class="taxonomy-layout">Standalone teaching block or connected buildings. A main building on a plaza or pedestrian axis is an approach variation.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=college/university</code>, <code>amenity=college/university</code> plus the function of each building.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Teaching block and lobby, campus signage, connecting corridor.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Research and test facilities</h4>
        <p class="taxonomy-layout">Repeated laboratory floors, large equipment test hall, or multi-building research campus.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>amenity=research_institute</code> plus individual building functions and their site relationship.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Office-style exterior and visitor lobby, large test hall and equipment door, site gate.</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="healthcare">
    <summary>Healthcare and welfare</summary>
    <div class="taxonomy-category-content">
      <p>A street-level clinic can have a direct entrance, while an upstairs clinic uses the building's shared stairs or lift. A hospital gives its outpatient lobby, emergency entrance and goods receiving door different roles. Nursing and welfare facilities can distinguish reception from entrances to residential areas.</p>
      <section class="taxonomy-item">
        <h4>Clinics</h4>
        <p class="taxonomy-layout">Direct ground-level entrance or upper-floor tenant.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>healthcare=doctor/clinic</code>, <code>amenity=doctors/clinic</code> plus <code>level</code> and entrance relationships.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Reception and waiting area, storefront door or shared stair and lift core.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>General hospitals</h4>
        <p class="taxonomy-layout">Main outpatient building or distributed clinics and centers. Emergency access and deliveries have separate roles.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=hospital</code>, <code>amenity=hospital</code>, <code>healthcare=hospital</code>. Confirm general hospital status and outpatient or ward use separately.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Outpatient lobby, building signs, emergency entrance and goods receiving door.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Public health centers</h4>
        <p class="taxonomy-layout">Urban multi-department building or low-rise local branch.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd>Healthcare and public facility tags plus confirmation that the facility is a public health center or branch. Generic healthcare tags leave the distinction from clinics open.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Reception and guidance, floor-specific counters or direct ground-level entrance.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Nursing facilities</h4>
        <p class="taxonomy-layout">Urban multistory residence or low-rise courtyard facility. Check movement between living floors and the yard.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>amenity=social_facility</code> plus confirmed care function such as <code>social_facility=nursing_home</code>.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Repeated room bays, reception, elevator and yard doors.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Social welfare centers</h4>
        <p class="taxonomy-layout">Dedicated building or shared cultural and sports complex.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>amenity=social_facility</code> or <code>amenity=community_centre</code> plus confirmation of welfare center use.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Reception counter, consultation and program floors, shared circulation core.</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="public-safety">
    <summary>Public services and safety</summary>
    <div class="taxonomy-category-content">
      <p>Municipal and community service offices are organized around reaching a public counter. An annex or multi-use civic building may require a building name and floor. At a fire station, the vehicle bays can dominate the facade, while the visitor entrance is recorded separately.</p>
      <section class="taxonomy-item">
        <h4>Municipal offices</h4>
        <p class="taxonomy-layout">Main building or a main building with separate annexes.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=government</code>, <code>office=government</code>, <code>amenity=townhall</code> plus institution and building details. <code>B=public/civic</code> establishes a broad public facility.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Civic facade, public lobby, plaza and building signs.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Community service offices</h4>
        <p class="taxonomy-layout">Neighborhood service counter or a multi-use building organized by floor.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd>Public or government tags plus confirmation of a community service office. Use tenants and floor data to identify mixed use.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Public service counter, common core and floor directory.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Fire facilities</h4>
        <p class="taxonomy-layout">Street-facing apparatus bays at a local fire station or a larger headquarters building.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=fire_station</code>, <code>amenity=fire_station</code>. Use institution details to distinguish headquarters from a local station.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Vehicle shutters and turnout lane, pedestrian door, administrative lobby.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Police facilities</h4>
        <p class="taxonomy-layout">Neighborhood substation or full station with public service counters.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>amenity=police</code> plus institution details.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Small public entrance or larger station lobby, vehicle gate.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Courthouses and prosecutors’ offices</h4>
        <p class="taxonomy-layout">A single block with public counters and courtrooms, or a complex with separate wings and controlled access. A public counter before security can serve as a handoff point.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>amenity=courthouse</code> identifies a court. Check the use of each annex or prosecutors’ office separately.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Public lobby, security checkpoint and links between wings.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Post offices and postal depots</h4>
        <p class="taxonomy-layout">A street-facing counter or a depot with a vehicle yard. Separate the route to the public counter from vehicle access.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>amenity=post_office</code> and <code>amenity=post_depot</code> distinguish the facility roles.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Street door, service counter and loading entrance.</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="culture">
    <summary>Culture and assembly</summary>
    <div class="taxonomy-category-content">
      <p>A museum may branch to galleries behind one lobby or send visitors across a yard to separate buildings. Theaters and exhibition venues can have audience entrances and equipment loading doors. A similar hall shell can serve both, while the handoff points remain distinct.</p>
      <figure class="building-example">
        <img src="/images/devlog/osm-building-classification/national-museum.jpg" width="1440" height="957" loading="lazy" alt="Visitors crossing the outdoor passage under the roof of the National Museum of Korea" />
        <figcaption>National Museum of Korea. A large sheltered outdoor passage connects several approaches. Photo by <a href="https://commons.wikimedia.org/wiki/File:National_Museum_of_Korea_exterior.jpg">Tristan Surtel</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>, resized for the web.</figcaption>
      </figure>
      <section class="taxonomy-item">
        <h4>Museums</h4>
        <p class="taxonomy-layout">One building with a common lobby or several exhibition buildings.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=museum</code>, <code>tourism=museum</code> plus building layout.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Exhibition shell and lobby, or outdoor space and building signs.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Libraries</h4>
        <p class="taxonomy-layout">Small neighborhood reading room or collections on multiple floors.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>amenity=library</code> plus building extent and floors.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Information desk, reading floors and common core.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Theaters</h4>
        <p class="taxonomy-layout">One main hall or a complex with several venues.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>amenity=theatre</code> plus venue and hall details.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Audience lobby and ticket check, hall signs, stage loading door.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Exhibition and convention venues</h4>
        <p class="taxonomy-layout">Exhibition and conference floors in one building or separate exhibition buildings.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>amenity=exhibition_centre/conference_centre</code> plus building, hall and floor data.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Large hall shell, visitor lobby, building and hall numbers, loading access.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Cinemas</h4>
        <p class="taxonomy-layout">A standalone cinema reached from the street or a multiplex inside a mall. The latter uses the mall entrance and the cinema's floor lobby.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>amenity=cinema</code> identifies the facility. <code>B=cinema</code> identifies a dedicated cinema building.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Ticket lobby, shared lift and ticket checkpoint.</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="religion">
    <summary>Religion</summary>
    <div class="taxonomy-category-content">
      <p>A church or prayer room in a commercial building can use the same shared core as an upstairs clinic. A standalone worship hall has a dedicated entrance, while a temple compound can lead through a gate and courtyards to individual halls.</p>
      <section class="taxonomy-item">
        <h4>Protestant churches</h4>
        <p class="taxonomy-layout">Tenant in a commercial building or dedicated worship hall.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>amenity=place_of_worship</code> plus <code>religion=christian</code> and denomination. <code>B=church/chapel</code> leaves denomination open.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Shared commercial core or dedicated worship shell and entrance.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Catholic churches</h4>
        <p class="taxonomy-layout">Worship and education spaces on different floors or in separate buildings.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd>A worship facility with Catholic <code>denomination=*</code> or a confirmed Catholic parish. <code>B=cathedral</code> is an exterior clue.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Church shell, education-floor core or yard and annex entrances.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Buddhist temples</h4>
        <p class="taxonomy-layout">Worship space in an urban building or compound with several halls.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd>A worship facility plus <code>religion=buddhist</code>. <code>B=temple</code> alone leaves religion open.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Urban entrance and core, or gate, yard and separate halls.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Muslim prayer facilities</h4>
        <p class="taxonomy-layout">Tenant in a mixed-use building or standalone mosque.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>religion=muslim</code> and a worship facility. <code>B=mosque</code> can indicate a dedicated exterior.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Shared commercial core or dedicated worship entrance.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Other or unclassified worship facilities</h4>
        <p class="taxonomy-layout">Tenant, standalone facility, or annex, based on confirmed use and access.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=religious/shrine/synagogue/kingdom_hall/monastery/presbytery</code>, among others. Distinguish worship, residence and administration.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Shared core, dedicated entrance, annex.</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="sports">
    <summary>Sports</summary>
    <div class="taxonomy-category-content">
      <p>A community gym leads through reception and changing rooms to the sports floor. At a spectator arena, visitors pass a ticket gate and find their seating section. Equipment can enter through a loading door. Both need a large hall, with different access roles.</p>
      <figure class="building-example">
        <img src="/images/devlog/osm-building-classification/anyang-stadium.jpg" width="1280" height="720" loading="lazy" alt="The field and surrounding spectator stands at Anyang Stadium" />
        <figcaption>Anyang Stadium separates the playing field from the spectator stands around it. Photo by <a href="https://commons.wikimedia.org/wiki/File:Anyang_Stadium.jpg">고려</a>, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>, resized for the web.</figcaption>
      </figure>
      <section class="taxonomy-item">
        <h4>Indoor sports halls</h4>
        <p class="taxonomy-layout">Community sports hall or spectator arena. Check seating and ticketing paths.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>leisure=sports_hall/sports_centre</code>, <code>B=sports_hall/sports_centre</code> plus confirmed spectator facilities.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Large hall shell, reception and changing rooms, or audience lobby and equipment access.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Indoor pools</h4>
        <p class="taxonomy-layout">Dedicated pool building or a facility inside a larger complex.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>leisure=swimming_pool</code> or a facility with <code>sport=swimming</code>, plus its building and floor relationships.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Reception and changing rooms, dedicated entrance or shared core.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Outdoor fields and stadiums</h4>
        <p class="taxonomy-layout">Community field or stadium with perimeter seating.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>leisure=pitch/track/stadium</code>, <code>B=stadium/grandstand</code> plus seating and gate information.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Fence and pedestrian gate, or seating and ticket gates with equipment access.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Gyms and fitness centers</h4>
        <p class="taxonomy-layout">Street-level facilities and upstairs or basement tenants. The route to reception may use a shared entrance and a change of floor.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>leisure=fitness_centre</code> identifies the facility. Check how much of the building it occupies before using it as building-level evidence.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Storefront glazing, shared stairs or lift, and reception desk.</dd>
        </dl>
      </section>
    </div>
  </details>
  <h3>Transport, infrastructure and other buildings</h3>
  <details class="taxonomy-category" id="transport">
    <summary>Transport and vehicles</summary>
    <div class="taxonomy-category-content">
      <p>Street entrances to a subway station can lead to the same concourse. At a rail station, placing the concourse above or below the tracks changes whether passengers go down or up to the platform. Terminals and airports separate public lobbies, boarding areas and vehicle approaches.</p>
      <figure class="building-example">
        <img src="/images/devlog/osm-building-classification/suwon-station.jpg" width="1280" height="960" loading="lazy" alt="Suwon Station frontage seen from the road where buses stop" />
        <figcaption>Suwon Station seen from the road in front of the station. Photo by <a href="https://commons.wikimedia.org/wiki/File:Suwon_station.JPG">Nils Öberg</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>, resized for the web.</figcaption>
      </figure>
      <section class="taxonomy-item">
        <h4>Urban rail stations</h4>
        <p class="taxonomy-layout">Underground station with dispersed entrances or elevated platforms.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>railway=station</code> plus service tags such as <code>station=subway</code>. <code>railway=subway_entrance</code> identifies individual street entrances. Confirm track and concourse height separately.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Street stairs, canopy and elevator, concourse and fare gates.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Mainline and high-speed rail stations</h4>
        <p class="taxonomy-layout">Station beside, above, or below the tracks.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=train_station</code>, <code>railway=station</code>, <code>public_transport=station</code> plus the relationship of the station to the tracks. High-speed service alone leaves the station layout open.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Station plaza and concourse, bridge or underpass, platform stairs.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Bus terminals</h4>
        <p class="taxonomy-layout">Standalone ground-level terminal or retail-integrated terminal.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>amenity=bus_station</code>, <code>B=transportation</code> plus links to the surrounding complex.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Ticketing and waiting hall, bus bays, turning area and pedestrian door.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Airport passenger terminals</h4>
        <p class="taxonomy-layout">Single terminal or main terminal with a separate concourse.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>aeroway=terminal</code> plus links between terminal and concourse. <code>aeroway=aerodrome</code> describes the airport site.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Drop-off canopy, public lobby, controlled door and connector.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Ferry terminals</h4>
        <p class="taxonomy-layout">Domestic waiting hall with direct pier access or international terminal with border controls.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>amenity=ferry_terminal</code> plus terminal and pier relationships. Confirm international service and vehicle boarding separately.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Waiting hall, pedestrian boarding path, vehicle queue and controlled gate.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Parking structures and fuel stations</h4>
        <p class="taxonomy-layout">Multistory parking building or fuel canopy with a service building.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=parking/garages</code>, <code>amenity=parking</code> with <code>parking=multi-storey</code>; <code>amenity=fuel</code> for fuel stations.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Vehicle ramps and barriers, open canopy, office or kiosk.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Vehicle and vessel storage</h4>
        <p class="taxonomy-layout">Aircraft hangar or boathouse.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=hangar/boathouse</code>.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Large shutters, steel-frame shell, service door.</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="agriculture">
    <summary>Agriculture</summary>
    <div class="taxonomy-category-content">
      <p>Greenhouses can use translucent roofs and repeated frames. Barns and work buildings can use open sides or large working doors. Farm-wide use stays at the site level, while individual walls and doors follow the building evidence.</p>
      <section class="taxonomy-item">
        <h4>Greenhouses, barns and farm outbuildings</h4>
        <p class="taxonomy-layout">Connected greenhouses, open-sided livestock shelter, or enclosed work building.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=greenhouse/conservatory</code>; <code>B=barn/farm_auxiliary/stable/cowshed/sty/livestock</code>.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Translucent roof, repeated frame and panels, farm vehicle door.</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="infrastructure">
    <summary>Utilities and infrastructure</summary>
    <div class="taxonomy-category-content">
      <p>Substations and power facilities are organized around equipment buildings and service access. Waste facilities can have vehicle intake doors. An office on the same site can reuse an office lobby while access to equipment areas stays separate.</p>
      <section class="taxonomy-item">
        <h4>Power, waste and broadcasting facilities</h4>
        <p class="taxonomy-layout">Enclosed substation, plant with equipment buildings, waste receiving facility, or offices with production buildings.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd>Site tags such as <code>power=substation/plant</code>, <code>man_made=wastewater_plant</code>, <code>amenity=waste_transfer_station</code>. Confirm broadcasting and production buildings separately.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Utility building, fence and service door, intake shutter, office lobby.</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="tourism">
    <summary>Tourism and rest facilities</summary>
    <div class="taxonomy-category-content">
      <p>At a service area, riders walk from parking toward shops and amenities. A youth activity center can put lodging and activity spaces in separate buildings, adding a building-level waypoint after the site entrance.</p>
      <section class="taxonomy-item">
        <h4>Service areas and youth activity centers</h4>
        <p class="taxonomy-layout">Roadside retail facing parking, or separate accommodation and activity buildings.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>highway=services</code> describes the service area. Confirm youth activity centers through facility information and the layout of lodging and activity buildings.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Parking-facing storefronts, shared entrance, guest buildings and paths.</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="special">
    <summary>Special facilities</summary>
    <div class="taxonomy-category-content">
      <p>Funeral facilities can organize access around a ceremony space and yard. Correctional and military facilities distinguish the site gate from entrances inside the compound. Ordinary deliveries can link to confirmed public receiving points.</p>
      <section class="taxonomy-item">
        <h4>Funeral, correctional and military facilities</h4>
        <p class="taxonomy-layout">Ceremony building and courtyard, secured compound, or barracks.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>amenity=funeral_hall/prison</code>, <code>landuse=military</code>, <code>B=barracks</code>, among others. Track site tags and individual building functions separately.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Ceremony lobby and yard, perimeter wall and controlled gate, repeated living quarters.</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="landmarks">
    <summary>Historic sites and landmarks</summary>
    <div class="taxonomy-category-content">
      <p>A city gate or gate tower depends on a recognizable form. It can use a hand-placed asset, with a separate pedestrian connection where a route passes through it.</p>
      <section class="taxonomy-item">
        <h4>City gates and gatehouses</h4>
        <p class="taxonomy-layout">Site-specific form, such as masonry with a timber gate tower.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd>Explicit landmark tags such as <code>historic=city_gate</code>.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Hand-placed asset with a passage where appropriate.</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="outbuildings">
    <summary>Outbuildings</summary>
    <div class="taxonomy-category-content">
      <p>Guard booths, sheds and open roofs can sit beside larger buildings, with delivery destinations assigned separately. They can share simple shells or canopy modules. A guard booth gets a receiving role where it serves as a handoff point.</p>
      <section class="taxonomy-item">
        <h4>Guard booths, small annexes and open roofs</h4>
        <p class="taxonomy-layout">Guard booth, enclosed utility or storage building, or open-sided roof.</p>
        <dl class="taxonomy-meta">
          <dt>OSM evidence</dt>
          <dd><code>B=guardhouse/gatehouse/shed/hut/outbuilding/garage/toilets/service/tech_cab/carport/roof</code>, among others.</dd>
          <dt>Reusable facade and access components</dt>
          <dd>Simple small shell, service door, canopy and columns.</dd>
        </dl>
      </section>
    </div>
  </details>
  <h3>Classification and module reuse</h3>
  <details class="taxonomy-category" id="incomplete-evidence">
    <summary>Classifying buildings with incomplete evidence</summary>
    <div class="taxonomy-category-content">
      <section class="taxonomy-item">
        <h4>Confirmed use and layout</h4>
        <dl class="taxonomy-meta">
          <dt>Classification to record</dt>
          <dd>Assign category, building type and subtype.</dd>
          <dt>Facade and access to generate</dt>
          <dd>Use the confirmed layout and entrances. Authored overrides take precedence for the fields they set.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Confirmed building use</h4>
        <dl class="taxonomy-meta">
          <dt>Classification to record</dt>
          <dd>Assign category and building type; leave subtype open.</dd>
          <dt>Facade and access to generate</dt>
          <dd>Use a shared facade sized to the building and a feasible default approach. Record generated access separately from observed entrances.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Confirmed tenant only</h4>
        <dl class="taxonomy-meta">
          <dt>Classification to record</dt>
          <dd>Keep the building’s existing category or leave it unclassified; register the tenant separately.</dd>
          <dt>Facade and access to generate</dt>
          <dd>Match the footprint, address and floor where available. Use known floor and entrance details for that tenant’s route.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4><code>building=yes</code>, blank, unknown, or conflicting building-use evidence</h4>
        <dl class="taxonomy-meta">
          <dt>Classification to record</dt>
          <dd>Keep the most specific supported level. Leave buildings with no use evidence unclassified.</dd>
          <dt>Facade and access to generate</dt>
          <dd>Generate a basic facade from the footprint, height and street orientation. Nearby land use and footprint shape can guide the appearance.</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="shared-modules">
    <summary>Facade and access modules shared across types</summary>
    <div class="taxonomy-category-content">
      <section class="taxonomy-item">
        <h4>Street door and repeated frontage</h4>
        <dl class="taxonomy-meta">
          <dt>Where it can be reused</dt>
          <dd>Neighborhood shops, street-level clinics, small public offices and dedicated worship buildings.</dd>
          <dt>Entrance connection</dt>
          <dd>Connect the door directly to the facility.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Shared entrance, vertical core and floor doors</h4>
        <dl class="taxonomy-meta">
          <dt>Where it can be reused</dt>
          <dd>Low-rise housing, multistory retail, upper-floor clinics and churches, offices, hotels.</dd>
          <dt>Entrance connection</dt>
          <dd>Connect the street entrance to the destination floor and tenant door.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Yard or site gate and individual building entrances</h4>
        <dl class="taxonomy-meta">
          <dt>Where it can be reused</dt>
          <dd>Apartment complexes, schools, hospitals, temples, resorts, factories.</dd>
          <dt>Entrance connection</dt>
          <dd>Keep the site gate as a waypoint and identify the destination building door.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Audience or passenger lobby and controlled gates</h4>
        <dl class="taxonomy-meta">
          <dt>Where it can be reused</dt>
          <dd>Theaters, stadiums, stations, airports and ports.</dd>
          <dt>Entrance connection</dt>
          <dd>Record the public handoff point and controlled entrance separately.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Vehicle approach and shutter, dock or loading door</h4>
        <dl class="taxonomy-meta">
          <dt>Where it can be reused</dt>
          <dd>Workshops, distribution centers, large retailers, exhibition halls and fire stations.</dd>
          <dt>Entrance connection</dt>
          <dd>Separate vehicle and pedestrian doors. Assign each vehicle door a role such as loading or emergency turnout.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>Podium or ground-floor base with repeated upper facade</h4>
        <dl class="taxonomy-meta">
          <dt>Where it can be reused</dt>
          <dd>Apartment blocks, office towers, accommodation and mixed-use buildings.</dd>
          <dt>Entrance connection</dt>
          <dd>Keep the role and ID of the ground-floor entrance as upper-floor finishes change.</dd>
        </dl>
      </section>
    </div>
  </details>
  <p class="taxonomy-note">Small outbuildings can reuse background components. Uncommon forms such as <code>stilt_house</code>, <code>houseboat</code>, <code>tent</code> and <code>bunker</code> can get individual assets where needed. We record <code>construction</code>, <code>ruins</code> and <code>abandoned:building=*</code> as building states and exclude them from automatic orders. <code>building=no</code> and demolished objects produce no standalone building. <code>building:part=*</code> belongs to the parent building.</p>
</div>
