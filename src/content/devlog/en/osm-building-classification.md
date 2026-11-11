---
title: "Reading Korean building types from OpenStreetMap"
description: "From shared apartment entrances to covered market lanes, how we classify Korean buildings and delivery routes from OSM."
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

A restaurant and an apartment upstairs can share an address while sending riders to different doors. The restaurant opens onto the sidewalk, while the homes use a shared entrance beside it. Those distinctions guide how we add facades and entrances to the OpenStreetMap (OSM) footprints from an [earlier devlog](/en/devlog/osm-to-unity/).

<h2 id="building-taxonomy">Korean building categories and types</h2>

A category describes a use such as housing or commerce. A building type distinguishes villas, apartment blocks, neighborhood shops and other forms. A subtype describes the layout that changes the facade or route. Each entry includes the OSM evidence and reusable modules. In the entries below, `B=value` means `building=value`.

<nav class="taxonomy-jump" aria-label="Building categories in this article">
  <a href="#housing">Housing</a>
  <a href="#commercial">Commercial</a>
  <a href="#mixed-use">Mixed use</a>
  <a href="#offices">Offices</a>
  <a href="#accommodation">Accommodation</a>
  <a href="#industry">Industry and logistics</a>
  <a href="#education">Education and research</a>
  <a href="#healthcare">Healthcare and welfare</a>
  <a href="#public-safety">Public services and safety</a>
  <a href="#culture">Culture and assembly</a>
  <a href="#religion">Religion</a>
  <a href="#sports">Sports</a>
  <a href="#transport">Transport and vehicles</a>
  <a href="#agriculture">Agriculture</a>
  <a href="#infrastructure">Utilities and infrastructure</a>
  <a href="#tourism">Tourism and rest facilities</a>
  <a href="#special">Special facilities</a>
  <a href="#landmarks">Historic sites and landmarks</a>
  <a href="#outbuildings">Outbuildings</a>
  <a href="#osm-evidence">OSM evidence</a>
</nav>

<section class="taxonomy-section" aria-labelledby="housing">
<h3 id="housing">Housing</h3>
<p>Residential deliveries often require finding another door after reaching the address. A detached home may have a yard between its gate and front door. Row houses can share walls while keeping separate doors. In a Korean villa, several homes share an entrance and the stairs or lift beyond it.</p>
<p>At a villa with piloti parking, a rider needs a walking route through the open ground floor to the shared entrance. We check the space left after placing columns, stairs and parked cars. An enclosed ground floor can put the shared door on the alley. If the door sits above street level, exterior steps and a landing can bridge the difference.</p>
<p>At an apartment complex, the block number and shared entrance come first. Slab blocks repeat windows and balconies along a long face, while tower blocks spread windows across several faces. Both can reuse window, balcony and lift modules. Dormitories can reuse repeated room bays, with approaches from campus paths or from the street.</p>
<figure>
  <img src="/images/devlog/osm-building-classification/jamsil-apartments.jpg" width="1000" height="750" loading="lazy" alt="Long residential blocks with repeated windows at Jamsil Apartment Complex Phase 5 in Seoul" />
  <figcaption>Jamsil Apartment Complex Phase 5 in Seoul. Windows and balconies repeat along the long residential blocks. Photo by <a href="https://commons.wikimedia.org/wiki/File:Jamsil_Apartment_Complex_Phase_5_(5460805782).jpg">InSapphoWeTrust</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA 2.0</a>.</figcaption>
</figure>
<details class="taxonomy-details" open>
  <summary>Housing building types (5)</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>Detached homes</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Urban alley or courtyard; rural single-story; urban hanok. Use the street setback, yard and roof to distinguish them.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=house/detached/bungalow/farm</code>. Confirm hanok separately.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Wall and pitched roof, perimeter gate, yard entrance.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Attached and row houses</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Two homes sharing a wall or a continuous row. Check shared walls and individual street access.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=semidetached_house/terrace</code>.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Repeated frontage, individual doors.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Villas and low-rise apartment buildings</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Piloti parking or enclosed ground floor with interior stairs. An exterior approach stair is an independent option.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=apartments</code> or confirmed residential use with <code>B=residential</code>, plus low-rise dimensions and footprint. Check piloti separately.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Repeated windows and balconies, shared entrance, stairs, piloti columns and parking, exterior steps and landings.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Apartment blocks</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Slab or tower, based on footprint proportions and core arrangement. Building age is a finish option.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=apartments</code> plus footprint and height for the individual block. The tag alone establishes apartment housing.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Repeated residential floors, block entrances, elevators, balconies.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Dormitories</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Low-rise campus residence or standalone urban residence. Check the connection to the campus or street.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=dormitory</code> plus the relationship to its site.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Repeated room bays, shared entrance and corridor.</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="commercial">
<h3 id="commercial">Commercial</h3>
<p>Our starting point for food pickups is the neighborhood storefront. At the address, the rider has to match <strong>the shop sign and door</strong> to the order. A standalone one-story shop opens directly onto the sidewalk. In a row of storefronts, several doors share one frontage, so each door needs its own shop association. Multistory retail distinguishes ground-floor shop doors from the shared entrance upstairs. An upper-floor pickup continues from that entrance through the stair or lift core to the tenant's door.</p>
<p>The same display window, sign and storefront modules can serve many shops. The pickup point can be a counter inside the tenant space. Markets and malls add a covered lane or shared lobby between the sidewalk and the shop. Larger stores and department stores distinguish customer doors from loading access.</p>
<figure>
  <img src="/images/devlog/osm-building-classification/korean-bbq-storefront.jpg" width="640" height="960" loading="lazy" alt="A restaurant sign above a door that opens onto the sidewalk in Seoul" />
  <figcaption>A Seoul restaurant with a sign above its sidewalk entrance. Photo by <a href="https://www.pexels.com/photo/entrance-to-a-korean-bbq-restaurant-18936030/">Pincalo</a>, <a href="https://www.pexels.com/license/">Pexels License</a>, resized for the web.</figcaption>
</figure>
<figure>
  <img src="/images/devlog/osm-building-classification/restaurant-storefronts.jpg" width="1440" height="982" loading="lazy" alt="Restaurant signs and separate entrances along a Seoul alley" />
  <figcaption>A restaurant lane in Seoul. Reaching the street is followed by finding the right sign and door. Photo by <a href="https://commons.wikimedia.org/wiki/File:Walking_beneath_restaurant_signs_in_Seoul_(55614010409).jpg">Sergiy Galyonkin</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>, resized for the web.</figcaption>
</figure>
<details class="taxonomy-details" open>
  <summary>Commercial building types (4)</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>Neighborhood shops</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Standalone one-story shop, continuous storefront row, or multistory retail building. Check how many doors face the street and whether upper floors share a core.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=retail/commercial/kiosk</code>. <code>shop=*</code> and <code>amenity=restaurant/cafe</code> can identify tenants.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Display windows, signs, storefront doors, shared upper-floor entrance and stairs.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Traditional markets</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Covered market lane or indoor market building. Stalls face an outdoor lane or an interior aisle.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>amenity=marketplace</code> plus market boundary, buildings and footpaths.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Arcade canopy, repeated stall fronts, market gate and indoor aisle.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Large retailers</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Multistory urban supermarket, warehouse store, or department store. Check sales floors, parking and loading.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=supermarket</code>, <code>shop=supermarket/department_store</code> plus dimensions and floor uses.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Large wall panels and display windows, customer lobby, parking ramps and loading doors.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Shopping malls</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Enclosed mall or open-air retail street. Check whether visitors move between stores indoors or across an outdoor plaza.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>shop=mall</code> plus building arrangement and pedestrian connections.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Enclosed mall lobby and concourse, or outdoor plaza and repeated storefronts.</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="mixed-use">
<h3 id="mixed-use">Mixed use</h3>
<p>A ground-floor restaurant and the homes above it can share an address. A pickup can use the storefront while a residential delivery uses the shared entrance. If both routes use one door, they branch inside by floor and destination. We plan to use this case first to check that the facade, interior transition and order directions all refer to the same entrance.</p>
<figure class="optional-image" hidden>
  <img data-optional-src="/images/devlog/osm-building-classification/building-types-and-entrances.png" alt="Concept diagram comparing entrances at a low-rise apartment building with piloti parking, one with an enclosed stairwell, and a shop with homes upstairs" />
  <figcaption>The ground-floor layout determines what the shared entrance and the shop door are used for.</figcaption>
</figure>
<details class="taxonomy-details">
  <summary>Mixed use building types (1)</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>Shop houses and mixed-use buildings</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Ground-floor shops with housing above; retail below offices or lodging; or floor uses unknown.</dd></div>
          <div><dt>OSM evidence</dt><dd>Songdo’s <code>B=mixed_use</code>, <code>building:use=multipurpose</code> or multiple uses. Specific combinations require floor and extent evidence.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Street-facing shop door and shared upper-floor entrance. Use separate doors when supported, or branch behind a documented common entrance.</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<h2 id="osm-evidence">How far can OSM tags take us?</h2>

The first step is to check **what the tag describes**. A building outline, a restaurant point inside it, and the grounds of a school with several buildings can be different OSM features. A restaurant point inside a footprint establishes a possible tenant. The building-wide use still needs evidence attached to the building or its relevant parts.

### Reading building and tenant tags

`building=yes` records the presence of a building, while `building=apartments` identifies apartment housing. Where `building:use` is present, it can tell us about current use. If the footprint and facility are **the same OSM feature**, facility tags can support a building-use classification. In the Ingye extract, NC Department Store Suwon had `building=yes` and `shop=department_store` on the same feature, which supported a large-retail classification. [OSM building tags](https://wiki.openstreetmap.org/wiki/Key:building) · [OSM building use tags](https://wiki.openstreetmap.org/wiki/Key:building:use)

When a restaurant is **a separate mapped point**, we use the footprint and address to link it as a tenant. A confirmed `level` belongs to that restaurant. The building retains whatever use can be established for it, and the restaurant's delivery floor and door are recorded separately. [OSM level tags](https://wiki.openstreetmap.org/wiki/Key:level) · [OSM entrance tags](https://wiki.openstreetmap.org/wiki/Key:entrance)

### Choosing a layout after identifying the use

For apartment housing, floors and footprint size can suggest a low-rise building or a larger block. A long, shallow footprint can suggest a slab facade. An open ground floor, parking use and the route to a shared door need their own evidence. Songdo's `building=mixed_use` records mixed use, while floor assignments and separate shop and residential doors remain open.

### What we could classify in Ingye and Songdo

Building tags alone assigned a broad category to **720 buildings in Ingye** and **1,227 in Songdo**. We then combined facility tags on the same features, set aside cases where names and use evidence conflicted, and tried rules based on selected names, floor counts and footprints. The counts below are cumulative.

- **Ingye:** Of 4,596 buildings, 753 reached a broad category, 322 a building type, and 139 a candidate facade subtype.
- **Songdo:** Of 1,546 buildings, 1,255 reached a broad category, 869 a building type, and 305 a candidate facade subtype.

Most subtype candidates were slab or tower facades suggested by footprint proportions and floor counts. Neither extract confirmed piloti parking or separate shop and residential doors.

## Facades and entrances in other categories

<section class="taxonomy-section" aria-labelledby="offices">
<h3 id="offices">Offices</h3>
<p>A small office can have a compact alley entrance, while a larger building sends visitors through a lobby to their floor. When towers share a podium, riders still need the right tower after reaching the street address. Punched windows and glazed facades can share the same lobby layout.</p>

<details class="taxonomy-details">
  <summary>Offices building types (3)</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>Small office buildings</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Single alley entrance or ground-floor showroom. Check how the office door relates to the showroom.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=office</code> or evidence of office use across the building. An <code>office=*</code> point may be a single tenant.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Compact office entrance and core, showroom frontage.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>General offices</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Punched windows in a wall grid or a glazed facade. Both can use the same lobby and entrance.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=office</code> or building-wide office use. Use facade records where available.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Wall and window panels or curtain wall, shared lobby and lifts.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>High-rise offices</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Single tower or multiple towers on a shared base. Check how the podium connects to tower lobbies.</dd></div>
          <div><dt>OSM evidence</dt><dd>Office use with <code>height</code>, <code>building:levels</code>, <code>building:part=*</code> and relationships between blocks.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Podium, repeated tower envelope, tower-specific lobbies and cores.</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="accommodation">
<h3 id="accommodation">Accommodation</h3>
<p>Hotels differ in how people reach the lobby, including whether there is a vehicle drop-off. Motels may use a common corridor or individual room garages. At resorts and multi-wing hanok stays, guests first find the right building. An order can point to a lobby or a specific room, depending on where the handoff is set.</p>

<details class="taxonomy-details">
  <summary>Accommodation building types (4)</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>Motels and inns</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Shared alley entrance or garage access for individual rooms. Check whether guests use an internal corridor or drive to their own room.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>tourism=motel</code>. Distinguish inns using accommodation tags and facility information.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Small lobby and corridor, or numbered garage and room doors.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Hotels</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Sidewalk entrance or covered vehicle drop-off. Check the approach to the lobby.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=hotel</code>, <code>tourism=hotel</code> plus approach and drop-off information.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Lobby and room floors, optional drop-off canopy and lane.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Resorts and condominiums</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Rooms concentrated in one block or distributed among low-rise blocks. Check whether guests first navigate to a floor or to a building.</dd></div>
          <div><dt>OSM evidence</dt><dd>Site information such as <code>leisure=resort</code> plus accommodation buildings and room layout.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Hotel lobby and core, or site gate, block numbers and paths.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Pensions and hanok stays</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Single-story rental house, one building with several guest rooms, or separate hanok wings around a yard.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>tourism=guest_house/apartment/chalet</code> are candidates. Confirm pension use and hanok form separately.</dd></div>
          <div><dt>Shared facade and access</dt><dd>House entrance and deck, room corridor, courtyard and wing entrances.</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="industry">
<h3 id="industry">Industry and logistics</h3>
<p>A workshop may open straight onto an alley through one shutter. A distribution center can have numbered docks and ramps for trucks. Recording the site gate separately from the receiving door lets the game distinguish a pedestrian entrance, a guard booth and a freight handoff.</p>

<details class="taxonomy-details">
  <summary>Industry and logistics building types (4)</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>Small workshops</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Alley-facing shutter or loading yard. Check whether vehicles can wait between the road and the shutter.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=industrial</code> plus evidence of small-scale production. Relevant <code>craft=*</code> tags are clues.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Steel-frame panels, shutter and pedestrian door, loading yard.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Factories</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Single production block or multiple buildings connected by site roads.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=industrial</code> plus manufacturing use. <code>landuse=industrial</code> describes the site.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Large production building, pedestrian and freight doors, guard booth and site roads.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Warehouses</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Single-story general storage or refrigerated storage. Confirm refrigeration through facility information.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=warehouse</code>. Confirm cold storage separately.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Steel-frame panel enclosure, freight door and optional sealed dock.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Distribution centers</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>A row of ground-level docks or truck ramps to docks on several floors.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=warehouse</code> plus logistics evidence such as <code>industrial=logistics</code>. Verify ramps and docks separately.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Repeated numbered docks, truck turning area and ramp.</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="education">
<h3 id="education">Education and research</h3>
<p>A school or university campus can contain teaching buildings, dormitories and sports halls. A rider passes the campus gate and finds the right building, sometimes using a connector between wings. Research facilities can have a visitor lobby and a separate door for large equipment.</p>

<details class="taxonomy-details">
  <summary>Education and research building types (4)</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>Childcare and kindergarten</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Standalone low-rise building or a facility inside a residential complex.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=kindergarten</code>, <code>amenity=kindergarten/childcare</code> plus residential complex relationship.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Childcare building shell, gate and yard, reception entrance.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Primary and secondary schools</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Classroom wing by a schoolyard, courtyard, or main and annex buildings joined by corridors.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=school</code>, <code>amenity=school</code> plus yard, blocks and connectors. Classify sports halls and other buildings individually.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Repeated classroom bays, school gate, building entrances and connecting corridors.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Universities</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Standalone teaching block or connected buildings. A main building on a plaza or pedestrian axis is an approach variation.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=college/university</code>, <code>amenity=college/university</code> plus the function of each building.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Teaching block and lobby, campus signage, connecting corridor.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Research and test facilities</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Repeated laboratory floors, large equipment test hall, or multi-building research campus.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>amenity=research_institute</code> plus individual building functions and their site relationship.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Office-style exterior and visitor lobby, large test hall and equipment door, site gate.</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="healthcare">
<h3 id="healthcare">Healthcare and welfare</h3>
<p>A street-level clinic can have a direct entrance, while an upstairs clinic uses the building's shared stairs or lift. A hospital gives its outpatient lobby, emergency entrance and goods receiving door different roles. Nursing and welfare facilities can distinguish reception from entrances to residential areas.</p>

<details class="taxonomy-details">
  <summary>Healthcare and welfare building types (5)</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>Clinics</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Direct ground-level entrance or upper-floor tenant.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>healthcare=doctor/clinic</code>, <code>amenity=doctors/clinic</code> plus <code>level</code> and entrance relationships.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Reception and waiting area, storefront door or shared stair and lift core.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>General hospitals</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Main outpatient building or distributed clinics and centers. Emergency access and deliveries have separate roles.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=hospital</code>, <code>amenity=hospital</code>, <code>healthcare=hospital</code>. Confirm general hospital status and outpatient or ward use separately.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Outpatient lobby, building signs, emergency entrance and goods receiving door.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Public health centers</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Urban multi-department building or low-rise local branch.</dd></div>
          <div><dt>OSM evidence</dt><dd>Healthcare and public facility tags plus confirmation that the facility is a public health center or branch. Generic healthcare tags leave the distinction from clinics open.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Reception and guidance, floor-specific counters or direct ground-level entrance.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Nursing facilities</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Urban multistory residence or low-rise courtyard facility. Check movement between living floors and the yard.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>amenity=social_facility</code> plus confirmed care function such as <code>social_facility=nursing_home</code>.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Repeated room bays, reception, elevator and yard doors.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Social welfare centers</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Dedicated building or shared cultural and sports complex.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>amenity=social_facility</code> or <code>amenity=community_centre</code> plus confirmation of welfare center use.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Reception counter, consultation and program floors, shared circulation core.</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="public-safety">
<h3 id="public-safety">Public services and safety</h3>
<p>Municipal and community service offices are organized around reaching a public counter. An annex or multi-use civic building may require a building name and floor. At a fire station, the vehicle bays can dominate the facade, while the visitor entrance is recorded separately.</p>

<details class="taxonomy-details">
  <summary>Public services and safety building types (4)</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>Municipal offices</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Main building or a main building with separate annexes.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=government</code>, <code>office=government</code>, <code>amenity=townhall</code> plus institution and building details. <code>B=public/civic</code> establishes a broad public facility.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Civic facade, public lobby, plaza and building signs.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Community service offices</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Neighborhood service counter or a multi-use building organized by floor.</dd></div>
          <div><dt>OSM evidence</dt><dd>Public or government tags plus confirmation of a community service office. Use tenants and floor data to identify mixed use.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Public service counter, common core and floor directory.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Fire facilities</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Street-facing apparatus bays at a local fire station or a larger headquarters building.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=fire_station</code>, <code>amenity=fire_station</code>. Use institution details to distinguish headquarters from a local station.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Vehicle shutters and turnout lane, pedestrian door, administrative lobby.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Police facilities</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Neighborhood substation or full station with public service counters.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>amenity=police</code> plus institution details.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Small public entrance or larger station lobby, vehicle gate.</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="culture">
<h3 id="culture">Culture and assembly</h3>
<p>A museum may branch to galleries behind one lobby or send visitors across a yard to separate buildings. Theaters and exhibition venues can have audience entrances and equipment loading doors. A similar hall shell can serve both, while the handoff points remain distinct.</p>
<figure>
  <img src="/images/devlog/osm-building-classification/national-museum.jpg" width="1440" height="957" loading="lazy" alt="Visitors crossing the outdoor passage under the roof of the National Museum of Korea" />
  <figcaption>National Museum of Korea. A large sheltered outdoor passage connects several approaches. Photo by <a href="https://commons.wikimedia.org/wiki/File:National_Museum_of_Korea_exterior.jpg">Tristan Surtel</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>, resized for the web.</figcaption>
</figure>
<details class="taxonomy-details">
  <summary>Culture and assembly building types (4)</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>Museums</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>One building with a common lobby or several exhibition buildings.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=museum</code>, <code>tourism=museum</code> plus building layout.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Exhibition shell and lobby, or outdoor space and building signs.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Libraries</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Small neighborhood reading room or collections on multiple floors.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>amenity=library</code> plus building extent and floors.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Information desk, reading floors and common core.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Theaters</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>One main hall or a complex with several venues.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>amenity=theatre</code> plus venue and hall details.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Audience lobby and ticket check, hall signs, stage loading door.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Exhibition and convention venues</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Exhibition and conference floors in one building or separate exhibition buildings.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>amenity=exhibition_centre/conference_centre</code> plus building, hall and floor data.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Large hall shell, visitor lobby, building and hall numbers, loading access.</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="religion">
<h3 id="religion">Religion</h3>
<p>A church or prayer room in a commercial building can use the same shared core as an upstairs clinic. A standalone worship hall has a dedicated entrance, while a temple compound can lead through a gate and courtyards to individual halls.</p>

<details class="taxonomy-details">
  <summary>Religion building types (5)</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>Protestant churches</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Tenant in a commercial building or dedicated worship hall.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>amenity=place_of_worship</code> plus <code>religion=christian</code> and denomination. <code>B=church/chapel</code> leaves denomination open.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Shared commercial core or dedicated worship shell and entrance.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Catholic churches</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Worship and education spaces on different floors or in separate buildings.</dd></div>
          <div><dt>OSM evidence</dt><dd>A worship facility with Catholic <code>denomination=*</code> or a confirmed Catholic parish. <code>B=cathedral</code> is an exterior clue.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Church shell, education-floor core or yard and annex entrances.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Buddhist temples</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Worship space in an urban building or compound with several halls.</dd></div>
          <div><dt>OSM evidence</dt><dd>A worship facility plus <code>religion=buddhist</code>. <code>B=temple</code> alone leaves religion open.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Urban entrance and core, or gate, yard and separate halls.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Muslim prayer facilities</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Tenant in a mixed-use building or standalone mosque.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>religion=muslim</code> and a worship facility. <code>B=mosque</code> can indicate a dedicated exterior.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Shared commercial core or dedicated worship entrance.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Other or unclassified worship facilities</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Tenant, standalone facility, or annex, based on confirmed use and access.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=religious/shrine/synagogue/kingdom_hall/monastery/presbytery</code>, among others. Distinguish worship, residence and administration.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Shared core, dedicated entrance, annex.</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="sports">
<h3 id="sports">Sports</h3>
<p>A community gym leads through reception and changing rooms to the sports floor. At a spectator arena, visitors pass a ticket gate and find their seating section. Equipment can enter through a loading door. Both need a large hall, with different access roles.</p>
<figure>
  <img src="/images/devlog/osm-building-classification/anyang-stadium.jpg" width="1280" height="720" loading="lazy" alt="The field and surrounding spectator stands at Anyang Stadium" />
  <figcaption>Anyang Stadium separates the playing field from the spectator stands around it. Photo by <a href="https://commons.wikimedia.org/wiki/File:Anyang_Stadium.jpg">고려</a>, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>, resized for the web.</figcaption>
</figure>
<details class="taxonomy-details">
  <summary>Sports building types (3)</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>Indoor sports halls</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Community sports hall or spectator arena. Check seating and ticketing paths.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>leisure=sports_hall/sports_centre</code>, <code>B=sports_hall/sports_centre</code> plus confirmed spectator facilities.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Large hall shell, reception and changing rooms, or audience lobby and equipment access.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Indoor pools</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Dedicated pool building or a facility inside a larger complex.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>leisure=swimming_pool</code> or a facility with <code>sport=swimming</code>, plus its building and floor relationships.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Reception and changing rooms, dedicated entrance or shared core.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Outdoor fields and stadiums</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Community field or stadium with perimeter seating.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>leisure=pitch/track/stadium</code>, <code>B=stadium/grandstand</code> plus seating and gate information.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Fence and pedestrian gate, or seating and ticket gates with equipment access.</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="transport">
<h3 id="transport">Transport and vehicles</h3>
<p>Street entrances to a subway station can lead to the same concourse. At a rail station, placing the concourse above or below the tracks changes whether passengers go down or up to the platform. Terminals and airports separate public lobbies, boarding areas and vehicle approaches.</p>
<figure>
  <img src="/images/devlog/osm-building-classification/suwon-station.jpg" width="1280" height="960" loading="lazy" alt="Suwon Station frontage seen from the road where buses stop" />
  <figcaption>Suwon Station seen from the road in front of the station. Photo by <a href="https://commons.wikimedia.org/wiki/File:Suwon_station.JPG">Nils Öberg</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>, resized for the web.</figcaption>
</figure>
<details class="taxonomy-details">
  <summary>Transport and vehicles building types (7)</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>Urban rail stations</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Underground station with dispersed entrances or elevated platforms.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>railway=station</code> plus service tags such as <code>station=subway</code>. <code>railway=subway_entrance</code> identifies individual street entrances. Confirm track and concourse height separately.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Street stairs, canopy and elevator, concourse and fare gates.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Mainline and high-speed rail stations</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Station beside, above, or below the tracks.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=train_station</code>, <code>railway=station</code>, <code>public_transport=station</code> plus the relationship of the station to the tracks. High-speed service alone leaves the station layout open.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Station plaza and concourse, bridge or underpass, platform stairs.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Bus terminals</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Standalone ground-level terminal or retail-integrated terminal.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>amenity=bus_station</code>, <code>B=transportation</code> plus links to the surrounding complex.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Ticketing and waiting hall, bus bays, turning area and pedestrian door.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Airport passenger terminals</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Single terminal or main terminal with a separate concourse.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>aeroway=terminal</code> plus links between terminal and concourse. <code>aeroway=aerodrome</code> describes the airport site.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Drop-off canopy, public lobby, controlled door and connector.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Ferry terminals</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Domestic waiting hall with direct pier access or international terminal with border controls.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>amenity=ferry_terminal</code> plus terminal and pier relationships. Confirm international service and vehicle boarding separately.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Waiting hall, pedestrian boarding path, vehicle queue and controlled gate.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Parking structures and fuel stations</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Multistory parking building or fuel canopy with a service building.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=parking/garages</code>, <code>amenity=parking</code> with <code>parking=multi-storey</code>; <code>amenity=fuel</code> for fuel stations.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Vehicle ramps and barriers, open canopy, office or kiosk.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Vehicle and vessel storage</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Aircraft hangar or boathouse.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=hangar/boathouse</code>.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Large shutters, steel-frame shell, service door.</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="agriculture">
<h3 id="agriculture">Agriculture</h3>
<p>Greenhouses can use translucent roofs and repeated frames. Barns and work buildings can use open sides or large working doors. Farm-wide use stays at the site level, while individual walls and doors follow the building evidence.</p>

<details class="taxonomy-details">
  <summary>Agriculture building types (1)</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>Greenhouses, barns and farm outbuildings</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Connected greenhouses, open-sided livestock shelter, or enclosed work building.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=greenhouse/conservatory</code>; <code>B=barn/farm_auxiliary/stable/cowshed/sty/livestock</code>.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Translucent roof, repeated frame and panels, farm vehicle door.</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="infrastructure">
<h3 id="infrastructure">Utilities and infrastructure</h3>
<p>Substations and power facilities are organized around equipment buildings and service access. Waste facilities can have vehicle intake doors. An office on the same site can reuse an office lobby while access to equipment areas stays separate.</p>

<details class="taxonomy-details">
  <summary>Utilities and infrastructure building types (1)</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>Power, waste and broadcasting facilities</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Enclosed substation, plant with equipment buildings, waste receiving facility, or offices with production buildings.</dd></div>
          <div><dt>OSM evidence</dt><dd>Site tags such as <code>power=substation/plant</code>, <code>man_made=wastewater_plant</code>, <code>amenity=waste_transfer_station</code>. Confirm broadcasting and production buildings separately.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Utility building, fence and service door, intake shutter, office lobby.</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="tourism">
<h3 id="tourism">Tourism and rest facilities</h3>
<p>At a service area, riders walk from parking toward shops and amenities. A youth activity center can put lodging and activity spaces in separate buildings, adding a building-level waypoint after the site entrance.</p>

<details class="taxonomy-details">
  <summary>Tourism and rest facilities building types (1)</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>Service areas and youth activity centers</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Roadside retail facing parking, or separate accommodation and activity buildings.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>highway=services</code> describes the service area. Confirm youth activity centers through facility information and the layout of lodging and activity buildings.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Parking-facing storefronts, shared entrance, guest buildings and paths.</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="special">
<h3 id="special">Special facilities</h3>
<p>Funeral facilities can organize access around a ceremony space and yard. Correctional and military facilities distinguish the site gate from entrances inside the compound. Ordinary deliveries can link to confirmed public receiving points.</p>

<details class="taxonomy-details">
  <summary>Special facilities building types (1)</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>Funeral, correctional and military facilities</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Ceremony building and courtyard, secured compound, or barracks.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>amenity=funeral_hall/prison</code>, <code>landuse=military</code>, <code>B=barracks</code>, among others. Track site tags and individual building functions separately.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Ceremony lobby and yard, perimeter wall and controlled gate, repeated living quarters.</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="landmarks">
<h3 id="landmarks">Historic sites and landmarks</h3>
<p>A city gate or gate tower depends on a recognizable form. It can use a hand-placed asset, with a separate pedestrian connection where a route passes through it.</p>

<details class="taxonomy-details">
  <summary>Historic sites and landmarks building types (1)</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>City gates and gatehouses</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Site-specific form, such as masonry with a timber gate tower.</dd></div>
          <div><dt>OSM evidence</dt><dd>Explicit landmark tags such as <code>historic=city_gate</code>.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Hand-placed asset with a passage where appropriate.</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="outbuildings">
<h3 id="outbuildings">Outbuildings</h3>
<p>Guard booths, sheds and open roofs can sit beside larger buildings, with delivery destinations assigned separately. They can share simple shells or canopy modules. A guard booth gets a receiving role where it serves as a handoff point.</p>

<details class="taxonomy-details">
  <summary>Outbuildings building types (1)</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>Guard booths, small annexes and open roofs</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Subtype and layout</dt><dd>Guard booth, enclosed utility or storage building, or open-sided roof.</dd></div>
          <div><dt>OSM evidence</dt><dd><code>B=guardhouse/gatehouse/shed/hut/outbuilding/garage/toilets/service/tech_cab/carport/roof</code>, among others.</dd></div>
          <div><dt>Shared facade and access</dt><dd>Simple small shell, service door, canopy and columns.</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

## Giving unclassified buildings a facade

A building can still help shape the street when its use is unclear. Its footprint and recorded height give us the outline. Low buildings get a few wall and window bays. Mid-rise buildings reuse those bays with floor bands and corner panels. Taller buildings repeat the same panels and use a base and a roofline to break up the height. For the street-facing treatment, we look at how the facade lines up with nearby roads and whether another building blocks the frontage. We record the door a rider can actually use separately.

<figure class="optional-image" hidden>
  <img data-optional-src="/images/devlog/osm-building-classification/ingye-songdo-facades.png" alt="OSM footprints and nearby roads in Ingye and Songdo alongside proposed building elevations" />
  <figcaption>The footprint and height stay in place while the window rhythm and finish respond to the street-facing wall.</figcaption>
</figure>

<details class="taxonomy-details">
  <summary>Classification with incomplete evidence</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>Confirmed use and layout</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Classification to record</dt><dd>Assign category, building type and subtype.</dd></div>
          <div><dt>Facade and access to generate</dt><dd>Use the confirmed layout and entrances. Authored overrides take precedence for the fields they set.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Confirmed building use</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Classification to record</dt><dd>Assign category and building type; leave subtype open.</dd></div>
          <div><dt>Facade and access to generate</dt><dd>Use a shared facade sized to the building and a feasible default approach. Record generated access separately from observed entrances.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Confirmed tenant only</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Classification to record</dt><dd>Keep the building’s existing category or leave it unclassified; register the tenant separately.</dd></div>
          <div><dt>Facade and access to generate</dt><dd>Match the footprint, address and floor where available. Use known floor and entrance details for that tenant’s route.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt><code>building=yes</code>, blank, unknown, or conflicting building-use evidence</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Classification to record</dt><dd>Keep the most specific supported level. Leave buildings with no use evidence unclassified.</dd></div>
          <div><dt>Facade and access to generate</dt><dd>Generate a basic facade from the footprint, height and street orientation. Nearby land use and footprint shape can guide the appearance.</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>

<details class="taxonomy-details">
  <summary>Shared facade and access modules</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>Street door and repeated frontage</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Where it can be reused</dt><dd>Neighborhood shops, street-level clinics, small public offices and dedicated worship buildings.</dd></div>
          <div><dt>Entrance connection</dt><dd>Connect the door directly to the facility.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Shared entrance, vertical core and floor doors</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Where it can be reused</dt><dd>Low-rise housing, multistory retail, upper-floor clinics and churches, offices, hotels.</dd></div>
          <div><dt>Entrance connection</dt><dd>Connect the street entrance to the destination floor and tenant door.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Yard or site gate and individual building entrances</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Where it can be reused</dt><dd>Apartment complexes, schools, hospitals, temples, resorts, factories.</dd></div>
          <div><dt>Entrance connection</dt><dd>Keep the site gate as a waypoint and identify the destination building door.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Audience or passenger lobby and controlled gates</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Where it can be reused</dt><dd>Theaters, stadiums, stations, airports and ports.</dd></div>
          <div><dt>Entrance connection</dt><dd>Record the public handoff point and controlled entrance separately.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Vehicle approach and shutter, dock or loading door</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Where it can be reused</dt><dd>Workshops, distribution centers, large retailers, exhibition halls and fire stations.</dd></div>
          <div><dt>Entrance connection</dt><dd>Separate vehicle and pedestrian doors. Assign each vehicle door a role such as loading or emergency turnout.</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>Podium or ground-floor base with repeated upper facade</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>Where it can be reused</dt><dd>Apartment blocks, office towers, accommodation and mixed-use buildings.</dd></div>
          <div><dt>Entrance connection</dt><dd>Keep the role and ID of the ground-floor entrance as upper-floor finishes change.</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>

Small outbuildings use shared background modules. Uncommon forms such as `stilt_house`, `houseboat`, `tent`, and `bunker` are candidates for dedicated assets. We record `construction`, `ruins`, and `abandoned:building=*` as states and exclude them from automatic deliveries. A demolished feature or `building=no` produces no standalone building. A `building:part=*` element belongs to its parent building. [OSM building part tags](https://wiki.openstreetmap.org/wiki/Key:building:part)

Our first gameplay check will run a restaurant pickup and an upstairs delivery at the same building. We plan to check that the two orders point to the correct doors and that surrounding wall collision leaves each open passage usable.
