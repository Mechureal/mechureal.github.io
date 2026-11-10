---
title: "Reading Korean building types from OpenStreetMap"
description: "From shared apartment entrances to covered market lanes, how we classify Korean buildings and delivery routes from OSM."
date: 2026-11-10
updated: 2026-11-10
author: Mechureal
game: broke-rider-simulator
tags: [development, map, osm]
draft: false
lang: en
translationKey: osm-building-classification
slug: osm-building-classification
---

A restaurant and an apartment upstairs can share a street address while sending riders to different doors. The restaurant may open onto the sidewalk, while the apartment is reached through a shared entrance around the corner. An [earlier devlog](/en/devlog/osm-to-unity/) covered how we bring OpenStreetMap (OSM) footprints into Unity. This time we looked at **homes and shops**, where most deliveries start and end, to decide what those footprints can tell us about facades and entrances.

[See the full building classification](#building-taxonomy)

## Finding the right door at a home

The game uses three levels of classification. The broad category covers uses such as housing and commerce. The building type distinguishes low-rise apartments, larger apartment blocks, and neighborhood shops. The subtype describes a layout that changes the facade or delivery route, such as an open ground floor or separate entrances for different parts of a building.

For detached houses, we distinguish a gate off an alley, a door beyond a yard, and a door facing the street. Attached and row houses can share walls while keeping individual entrances. In a low-rise apartment building, often called a villa in Korea, several homes share an entrance and stairs. Piloti parking leaves the ground level open, with a walking route between columns and parking spaces. An enclosed ground floor uses regular wall panels. Exterior steps and a landing can serve an entrance above street level, with either ground-floor layout.

For a generated piloti layout, the usable width after allowing for columns and the stairs matters more than the overall footprint. A car needs room to enter from the street, and there must be a path to the shared door beside a parked car. An enclosed ground floor and a regular shared entrance are the default candidates when that space is limited.

Apartment deliveries start by finding the block number and the right shared door. Slab blocks repeat windows and balconies along a long face. Tower blocks have several faces arranged around a circulation core. Both can reuse window, balcony, and elevator modules, with finishes and signs of age chosen separately. Dormitories can reuse repeated room bays. A campus residence connects to campus paths, while a standalone urban residence connects to the street or its own grounds.

<figure>
  <img src="/images/devlog/osm-building-classification/jamsil-apartments.jpg" width="1000" height="750" loading="lazy" alt="Rows of windows and balconies along the long faces of the Jamsil Apartment Complex Phase 5 in Seoul" />
  <figcaption>Jamsil Apartment Complex Phase 5 in Seoul. Apartment windows and balconies repeat along the long facade. Photo by <a href="https://commons.wikimedia.org/wiki/File:Jamsil_Apartment_Complex_Phase_5_(5460805782).jpg">InSapphoWeTrust</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA 2.0</a>.</figcaption>
</figure>

## Finding the right shop

Neighborhood retail is organized by the route to the shop on the order. A standalone one-story shop can open straight onto the sidewalk. A row of storefronts has several signs and doors on the same face, so the rider needs the right one. A multistory building can have ground-floor storefronts and a shared entrance to upper floors. A pickup upstairs goes through the shared stair or lift core to the tenant's door.

Traditional markets include covered lanes lined with stalls and indoor market buildings with their own aisles. Larger stores and department stores distinguish customer doors from loading access. A mall may connect shops along an indoor concourse or around an outdoor plaza. The same storefront modules can serve all of these, while the first waypoint changes from sidewalk to market lane to mall lobby.

<figure>
  <img src="/images/devlog/osm-building-classification/gwangjang-market.jpg" width="1440" height="805" loading="lazy" alt="Shop signs and stalls lining both sides of a covered aisle at Gwangjang Market in Seoul" />
  <figcaption>Gwangjang Market in Seoul. Stalls line both sides of a covered aisle. Photo by <a href="https://commons.wikimedia.org/wiki/File:Gwangjang_Market,_Seoul_02.jpg">Bgag</a>, <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0</a>, resized for the web.</figcaption>
</figure>

A building with shops below homes brings the two routes together. Where a storefront door and a shared residential entrance are confirmed, each gets its own entrance record. Where people enter through one door, the routes split inside by floor and destination. The plan is for the facade, interior transition, and order directions to reference the same entrance.

<figure class="optional-image" hidden>
  <img data-optional-src="/images/devlog/osm-building-classification/building-types-and-entrances.png" alt="Concept diagram comparing entrances at a low-rise apartment building with piloti parking, one with an enclosed stairwell, and a shop with homes upstairs" />
  <figcaption>The ground-floor layout determines what the shared entrance and the shop door are used for.</figcaption>
</figure>

## How far can OSM tags take us?

The tag `building=apartments` identifies apartment housing. A footprint and floor count can help distinguish a low-rise building from a larger block, while open ground-floor parking needs its own evidence. The tag `building=yes` records a building's presence. If the same OSM feature also has `shop=department_store`, we can classify it as a retail building. A separately mapped restaurant inside the footprint can be linked as a tenant while the building's overall use stays unresolved. When present, a tag such as `building:use` provides additional evidence about current use. [OSM building tags](https://wiki.openstreetmap.org/wiki/Key:building) · [OSM building use tags](https://wiki.openstreetmap.org/wiki/Key:building:use)

We tried these rules on the Ingye and Songdo extracts, using facility tags on the same features, selected facility names, floor counts, and footprints. The counts are cumulative at each level.

- **Ingye:** Of 4,596 buildings, 753 reached a broad category, 322 a building type, and 139 a candidate facade subtype.
- **Songdo:** Of 1,546 buildings, 1,255 reached a broad category, 869 a building type, and 305 a candidate facade subtype.

Most subtype candidates were slab or tower facades suggested by footprint proportions and floor counts. Neither extract confirmed piloti parking or separate shop and residential doors. The counts reflect these particular map extracts and the rules we tried.

## Giving unclassified buildings a facade

A building can still help shape the street when its use is unclear. Its footprint and recorded height give us the outline. Low buildings get a few wall and window bays. Mid-rise buildings reuse those bays with floor bands and corner panels. Taller buildings repeat the same panels and use a base and a roofline to break up the height. For the street-facing treatment, we look at how the facade lines up with nearby roads and whether another building blocks the frontage. We record the door a rider can actually use separately.

<figure class="optional-image" hidden>
  <img data-optional-src="/images/devlog/osm-building-classification/ingye-songdo-facades.png" alt="OSM footprints and nearby roads in Ingye and Songdo alongside proposed building elevations" />
  <figcaption>The footprint and height stay in place while the window rhythm and finish respond to the street-facing wall.</figcaption>
</figure>

Our first gameplay check will use a ground-floor shop and upstairs homes with separate doors. Each order will point to its own entrance, and the door and surrounding wall will use the same opening. We'll ride both routes to check that the orders lead to different doors and that wall collision leaves each entrance usable.

<h2 id="building-taxonomy">Full Korean building classification</h2>

The tables cover the category, building type, layout subtype, OSM evidence, and shared facade or entrance modules. `B=value` is short for `building=value`. A tag on an entire school or hospital site describes a different extent from the function of an individual building. Expand a section to read its table. [OSM building tag values](https://wiki.openstreetmap.org/wiki/Key:building#Values)

<details class="taxonomy-details">
<summary>Housing, commerce, offices, and accommodation</summary>

<div class="taxonomy-table" role="region" aria-label="Housing, commerce, offices, and accommodation" tabindex="0">

| Category | Building type | Subtype and layout | OSM mapping | Shared facade and access |
| --- | --- | --- | --- | --- |
| Housing | Detached homes | Urban alley or courtyard; rural single-story; urban hanok. Use the street setback, yard and roof to distinguish them. | `B=house/detached/bungalow/farm`. Confirm hanok separately. | Wall and pitched roof, perimeter gate, yard entrance. |
| Housing | Attached and row houses | Two homes sharing a wall or a continuous row. Check shared walls and individual street access. | `B=semidetached_house/terrace`. | Repeated frontage, individual doors. |
| Housing | Villas and low-rise apartment buildings | Piloti parking or enclosed ground floor with interior stairs. An exterior approach stair is an independent option. | `B=apartments` or confirmed residential use with `B=residential`, plus low-rise dimensions and footprint. Check piloti separately. | Repeated windows and balconies, shared entrance, stairs, piloti columns and parking, exterior steps and landings. |
| Housing | Apartment blocks | Slab or tower, based on footprint proportions and core arrangement. Building age is a finish option. | `B=apartments` plus footprint and height for the individual block. The tag alone establishes apartment housing. | Repeated residential floors, block entrances, elevators, balconies. |
| Housing | Dormitories | Low-rise campus residence or standalone urban residence. Check the connection to the campus or street. | `B=dormitory` plus the relationship to its site. | Repeated room bays, shared entrance and corridor. |
| Commercial | Neighborhood shops | Standalone one-story shop, continuous storefront row, or multistory retail building. Check how many doors face the street and whether upper floors share a core. | `B=retail/commercial/kiosk`. `shop=*` and `amenity=restaurant/cafe` can identify tenants. | Display windows, signs, storefront doors, shared upper-floor entrance and stairs. |
| Commercial | Traditional markets | Covered market lane or indoor market building. Stalls face an outdoor lane or an interior aisle. | `amenity=marketplace` plus market boundary, buildings and footpaths. | Arcade canopy, repeated stall fronts, market gate and indoor aisle. |
| Commercial | Large retailers | Multistory urban supermarket, warehouse store, or department store. Check sales floors, parking and loading. | `B=supermarket`, `shop=supermarket/department_store` plus dimensions and floor uses. | Large wall panels and display windows, customer lobby, parking ramps and loading doors. |
| Commercial | Shopping malls | Enclosed mall or open-air retail street. Check whether visitors move between stores indoors or across an outdoor plaza. | `shop=mall` plus building arrangement and pedestrian connections. | Enclosed mall lobby and concourse, or outdoor plaza and repeated storefronts. |
| Offices | Small office buildings | Single alley entrance or ground-floor showroom. Check how the office door relates to the showroom. | `B=office` or evidence of office use across the building. An `office=*` point may be a single tenant. | Compact office entrance and core, showroom frontage. |
| Offices | General offices | Punched windows in a wall grid or a glazed facade. Both can use the same lobby and entrance. | `B=office` or building-wide office use. Use facade records where available. | Wall and window panels or curtain wall, shared lobby and lifts. |
| Offices | High-rise offices | Single tower or multiple towers on a shared base. Check how the podium connects to tower lobbies. | Office use with `height`, `building:levels`, `building:part=*` and relationships between blocks. | Podium, repeated tower envelope, tower-specific lobbies and cores. |
| Mixed use | Shop houses and mixed-use buildings | Ground-floor shops with housing above; retail below offices or lodging; or floor uses unknown. | Songdo’s `B=mixed_use`, `building:use=multipurpose` or multiple uses. Specific combinations require floor and extent evidence. | Street-facing shop door and shared upper-floor entrance. Use separate doors when supported, or branch behind a documented common entrance. |
| Accommodation | Motels and inns | Shared alley entrance or garage access for individual rooms. Check whether guests use an internal corridor or drive to their own room. | `tourism=motel`. Distinguish inns using accommodation tags and facility information. | Small lobby and corridor, or numbered garage and room doors. |
| Accommodation | Hotels | Sidewalk entrance or covered vehicle drop-off. Check the approach to the lobby. | `B=hotel`, `tourism=hotel` plus approach and drop-off information. | Lobby and room floors, optional drop-off canopy and lane. |
| Accommodation | Resorts and condominiums | Rooms concentrated in one block or distributed among low-rise blocks. Check whether guests first navigate to a floor or to a building. | Site information such as `leisure=resort` plus accommodation buildings and room layout. | Hotel lobby and core, or site gate, block numbers and paths. |
| Accommodation | Pensions and hanok stays | Single-story rental house, one building with several guest rooms, or separate hanok wings around a yard. | `tourism=guest_house/apartment/chalet` are candidates. Confirm pension use and hanok form separately. | House entrance and deck, room corridor, courtyard and wing entrances. |

</div>
</details>

<details class="taxonomy-details">
<summary>Industry, logistics, education, research, healthcare, and welfare</summary>

<div class="taxonomy-table" role="region" aria-label="Industry, logistics, education, research, healthcare, and welfare" tabindex="0">

| Category | Building type | Subtype and layout | OSM mapping | Shared facade and access |
| --- | --- | --- | --- | --- |
| Industry and logistics | Small workshops | Alley-facing shutter or loading yard. Check whether vehicles can wait between the road and the shutter. | `B=industrial` plus evidence of small-scale production. Relevant `craft=*` tags are clues. | Steel-frame panels, shutter and pedestrian door, loading yard. |
| Industry and logistics | Factories | Single production block or multiple buildings connected by site roads. | `B=industrial` plus manufacturing use. `landuse=industrial` describes the site. | Large production building, pedestrian and freight doors, guard booth and site roads. |
| Industry and logistics | Warehouses | Single-story general storage or refrigerated storage. Confirm refrigeration through facility information. | `B=warehouse`. Confirm cold storage separately. | Steel-frame panel enclosure, freight door and optional sealed dock. |
| Industry and logistics | Distribution centers | A row of ground-level docks or truck ramps to docks on several floors. | `B=warehouse` plus logistics evidence such as `industrial=logistics`. Verify ramps and docks separately. | Repeated numbered docks, truck turning area and ramp. |
| Education and research | Childcare and kindergarten | Standalone low-rise building or a facility inside a residential complex. | `B=kindergarten`, `amenity=kindergarten/childcare` plus residential complex relationship. | Childcare building shell, gate and yard, reception entrance. |
| Education and research | Primary and secondary schools | Classroom wing by a schoolyard, courtyard, or main and annex buildings joined by corridors. | `B=school`, `amenity=school` plus yard, blocks and connectors. Classify sports halls and other buildings individually. | Repeated classroom bays, school gate, building entrances and connecting corridors. |
| Education and research | Universities | Standalone teaching block or connected buildings. A main building on a plaza or pedestrian axis is an approach variation. | `B=college/university`, `amenity=college/university` plus the function of each building. | Teaching block and lobby, campus signage, connecting corridor. |
| Education and research | Research and test facilities | Repeated laboratory floors, large equipment test hall, or multi-building research campus. | `amenity=research_institute` plus individual building functions and their site relationship. | Office-style exterior and visitor lobby, large test hall and equipment door, site gate. |
| Healthcare and welfare | Clinics | Direct ground-level entrance or upper-floor tenant. | `healthcare=doctor/clinic`, `amenity=doctors/clinic` plus `level` and entrance relationships. | Reception and waiting area, storefront door or shared stair and lift core. |
| Healthcare and welfare | General hospitals | Main outpatient building or distributed clinics and centers. Emergency access and deliveries have separate roles. | `B=hospital`, `amenity=hospital`, `healthcare=hospital`. Confirm general hospital status and outpatient or ward use separately. | Outpatient lobby, building signs, emergency entrance and goods receiving door. |
| Healthcare and welfare | Public health centers | Urban multi-department building or low-rise local branch. | Healthcare and public facility tags plus confirmation that the facility is a public health center or branch. Generic healthcare tags leave the distinction from clinics open. | Reception and guidance, floor-specific counters or direct ground-level entrance. |
| Healthcare and welfare | Nursing facilities | Urban multistory residence or low-rise courtyard facility. Check movement between living floors and the yard. | `amenity=social_facility` plus confirmed care function such as `social_facility=nursing_home`. | Repeated room bays, reception, elevator and yard doors. |
| Healthcare and welfare | Social welfare centers | Dedicated building or shared cultural and sports complex. | `amenity=social_facility` or `amenity=community_centre` plus confirmation of welfare center use. | Reception counter, consultation and program floors, shared circulation core. |

</div>
</details>

<details class="taxonomy-details">
<summary>Public services, culture, religion, and sports</summary>

<div class="taxonomy-table" role="region" aria-label="Public services, culture, religion, and sports" tabindex="0">

| Category | Building type | Subtype and layout | OSM mapping | Shared facade and access |
| --- | --- | --- | --- | --- |
| Public services and safety | Municipal offices | Main building or a main building with separate annexes. | `B=government`, `office=government`, `amenity=townhall` plus institution and building details. `B=public/civic` establishes a broad public facility. | Civic facade, public lobby, plaza and building signs. |
| Public services and safety | Community service offices | Neighborhood service counter or a multi-use building organized by floor. | Public or government tags plus confirmation of a community service office. Use tenants and floor data to identify mixed use. | Public service counter, common core and floor directory. |
| Public services and safety | Fire facilities | Street-facing apparatus bays at a local fire station or a larger headquarters building. | `B=fire_station`, `amenity=fire_station`. Use institution details to distinguish headquarters from a local station. | Vehicle shutters and turnout lane, pedestrian door, administrative lobby. |
| Public services and safety | Police facilities | Neighborhood substation or full station with public service counters. | `amenity=police` plus institution details. | Small public entrance or larger station lobby, vehicle gate. |
| Culture and assembly | Museums | One building with a common lobby or several exhibition buildings. | `B=museum`, `tourism=museum` plus building layout. | Exhibition shell and lobby, or outdoor space and building signs. |
| Culture and assembly | Libraries | Small neighborhood reading room or collections on multiple floors. | `amenity=library` plus building extent and floors. | Information desk, reading floors and common core. |
| Culture and assembly | Theaters | One main hall or a complex with several venues. | `amenity=theatre` plus venue and hall details. | Audience lobby and ticket check, hall signs, stage loading door. |
| Culture and assembly | Exhibition and convention venues | Exhibition and conference floors in one building or separate exhibition buildings. | `amenity=exhibition_centre/conference_centre` plus building, hall and floor data. | Large hall shell, visitor lobby, building and hall numbers, loading access. |
| Religion | Protestant churches | Tenant in a commercial building or dedicated worship hall. | `amenity=place_of_worship` plus `religion=christian` and denomination. `B=church/chapel` leaves denomination open. | Shared commercial core or dedicated worship shell and entrance. |
| Religion | Catholic churches | Worship and education spaces on different floors or in separate buildings. | A worship facility with Catholic `denomination=*` or a confirmed Catholic parish. `B=cathedral` is an exterior clue. | Church shell, education-floor core or yard and annex entrances. |
| Religion | Buddhist temples | Worship space in an urban building or compound with several halls. | A worship facility plus `religion=buddhist`. `B=temple` alone leaves religion open. | Urban entrance and core, or gate, yard and separate halls. |
| Religion | Muslim prayer facilities | Tenant in a mixed-use building or standalone mosque. | `religion=muslim` and a worship facility. `B=mosque` can indicate a dedicated exterior. | Shared commercial core or dedicated worship entrance. |
| Religion | Other or unclassified worship facilities | Tenant, standalone facility, or annex, based on confirmed use and access. | `B=religious/shrine/synagogue/kingdom_hall/monastery/presbytery`, among others. Distinguish worship, residence and administration. | Shared core, dedicated entrance, annex. |
| Sports | Indoor sports halls | Community sports hall or spectator arena. Check seating and ticketing paths. | `leisure=sports_hall/sports_centre`, `B=sports_hall/sports_centre` plus confirmed spectator facilities. | Large hall shell, reception and changing rooms, or audience lobby and equipment access. |
| Sports | Indoor pools | Dedicated pool building or a facility inside a larger complex. | `leisure=swimming_pool` or a facility with `sport=swimming`, plus its building and floor relationships. | Reception and changing rooms, dedicated entrance or shared core. |
| Sports | Outdoor fields and stadiums | Community field or stadium with perimeter seating. | `leisure=pitch/track/stadium`, `B=stadium/grandstand` plus seating and gate information. | Fence and pedestrian gate, or seating and ticket gates with equipment access. |

</div>
</details>

<details class="taxonomy-details">
<summary>Transport, vehicles, and supporting facilities</summary>

<div class="taxonomy-table" role="region" aria-label="Transport, vehicles, and supporting facilities" tabindex="0">

| Category | Building type | Subtype and layout | OSM mapping | Shared facade and access |
| --- | --- | --- | --- | --- |
| Transport and vehicles | Urban rail stations | Underground station with dispersed entrances or elevated platforms. | `railway=station` plus service tags such as `station=subway`. `railway=subway_entrance` identifies individual street entrances. Confirm track and concourse height separately. | Street stairs, canopy and elevator, concourse and fare gates. |
| Transport and vehicles | Mainline and high-speed rail stations | Station beside, above, or below the tracks. | `B=train_station`, `railway=station`, `public_transport=station` plus the relationship of the station to the tracks. High-speed service alone leaves the station layout open. | Station plaza and concourse, bridge or underpass, platform stairs. |
| Transport and vehicles | Bus terminals | Standalone ground-level terminal or retail-integrated terminal. | `amenity=bus_station`, `B=transportation` plus links to the surrounding complex. | Ticketing and waiting hall, bus bays, turning area and pedestrian door. |
| Transport and vehicles | Airport passenger terminals | Single terminal or main terminal with a separate concourse. | `aeroway=terminal` plus links between terminal and concourse. `aeroway=aerodrome` describes the airport site. | Drop-off canopy, public lobby, controlled door and connector. |
| Transport and vehicles | Ferry terminals | Domestic waiting hall with direct pier access or international terminal with border controls. | `amenity=ferry_terminal` plus terminal and pier relationships. Confirm international service and vehicle boarding separately. | Waiting hall, pedestrian boarding path, vehicle queue and controlled gate. |
| Transport and vehicles | Parking structures and fuel stations | Multistory parking building or fuel canopy with a service building. | `B=parking/garages`, `amenity=parking` with `parking=multi-storey`; `amenity=fuel` for fuel stations. | Vehicle ramps and barriers, open canopy, office or kiosk. |
| Transport and vehicles | Vehicle and vessel storage | Aircraft hangar or boathouse. | `B=hangar/boathouse`. | Large shutters, steel-frame shell, service door. |
| Agriculture | Greenhouses, barns and farm outbuildings | Connected greenhouses, open-sided livestock shelter, or enclosed work building. | `B=greenhouse/conservatory`; `B=barn/farm_auxiliary/stable/cowshed/sty/livestock`. | Translucent roof, repeated frame and panels, farm vehicle door. |
| Utilities and infrastructure | Power, waste and broadcasting facilities | Enclosed substation, plant with equipment buildings, waste receiving facility, or offices with production buildings. | Site tags such as `power=substation/plant`, `man_made=wastewater_plant`, `amenity=waste_transfer_station`. Confirm broadcasting and production buildings separately. | Utility building, fence and service door, intake shutter, office lobby. |
| Tourism and rest facilities | Service areas and youth activity centers | Roadside retail facing parking, or separate accommodation and activity buildings. | `highway=services` describes the service area. Confirm youth activity centers through facility information and the layout of lodging and activity buildings. | Parking-facing storefronts, shared entrance, guest buildings and paths. |
| Special facilities | Funeral, correctional and military facilities | Ceremony building and courtyard, secured compound, or barracks. | `amenity=funeral_hall/prison`, `landuse=military`, `B=barracks`, among others. Track site tags and individual building functions separately. | Ceremony lobby and yard, perimeter wall and controlled gate, repeated living quarters. |
| Historic sites and landmarks | City gates and gatehouses | Site-specific form, such as masonry with a timber gate tower. | Explicit landmark tags such as `historic=city_gate`. | Hand-placed asset with a passage where appropriate. |
| Outbuildings | Guard booths, small annexes and open roofs | Guard booth, enclosed utility or storage building, or open-sided roof. | `B=guardhouse/gatehouse/shed/hut/outbuilding/garage/toilets/service/tech_cab/carport/roof`, among others. | Simple small shell, service door, canopy and columns. |

</div>
</details>

<details class="taxonomy-details">
<summary>When the evidence is incomplete</summary>

<div class="taxonomy-table" role="region" aria-label="When the evidence is incomplete" tabindex="0">

| Available evidence | Classification to record | Facade and access to generate |
| --- | --- | --- |
| Confirmed use and layout | Assign category, building type and subtype. | Use the confirmed layout and entrances. Authored overrides take precedence for the fields they set. |
| Confirmed building use | Assign category and building type; leave subtype open. | Use a shared facade sized to the building and a feasible default approach. Record generated access separately from observed entrances. |
| Confirmed tenant only | Keep the building’s existing category or leave it unclassified; register the tenant separately. | Match the footprint, address and floor where available. Use known floor and entrance details for that tenant’s route. |
| `building=yes`, blank, unknown, or conflicting building-use evidence | Keep the most specific supported level. Leave buildings with no use evidence unclassified. | Generate a basic facade from the footprint, height and street orientation. Nearby land use and footprint shape can guide the appearance. |

</div>
</details>

<details class="taxonomy-details">
<summary>Shared facade and entrance modules</summary>

<div class="taxonomy-table" role="region" aria-label="Shared facade and entrance modules" tabindex="0">

| Module | Where it can be reused | Entrance connection |
| --- | --- | --- |
| Street door and repeated frontage | Neighborhood shops, street-level clinics, small public offices and dedicated worship buildings. | Connect the door directly to the facility. |
| Shared entrance, vertical core and floor doors | Low-rise housing, multistory retail, upper-floor clinics and churches, offices, hotels. | Connect the street entrance to the destination floor and tenant door. |
| Yard or site gate and individual building entrances | Apartment complexes, schools, hospitals, temples, resorts, factories. | Keep the site gate as a waypoint and identify the destination building door. |
| Audience or passenger lobby and controlled gates | Theaters, stadiums, stations, airports and ports. | Record the public handoff point and controlled entrance separately. |
| Vehicle approach and shutter, dock or loading door | Workshops, distribution centers, large retailers, exhibition halls and fire stations. | Separate vehicle and pedestrian doors. Assign each vehicle door a role such as loading or emergency turnout. |
| Podium or ground-floor base with repeated upper facade | Apartment blocks, office towers, accommodation and mixed-use buildings. | Keep the role and ID of the ground-floor entrance as upper-floor finishes change. |

</div>
</details>

Small outbuildings use shared background modules. Uncommon forms such as `stilt_house`, `houseboat`, `tent`, and `bunker` are candidates for dedicated assets. We record `construction`, `ruins`, and `abandoned:building=*` as states and exclude them from automatic deliveries. A demolished feature or `building=no` produces no standalone building. A `building:part=*` element belongs to its parent building. [OSM building part tags](https://wiki.openstreetmap.org/wiki/Key:building:part)
