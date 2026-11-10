---
title: "Reading Korean building types from OpenStreetMap"
description: "What the maps of Ingye and Songdo tell us about building types, facades, and the doors riders need to find."
date: 2026-11-10
author: Mechureal
game: broke-rider-simulator
tags: [development, map, osm]
draft: false
lang: en
translationKey: osm-building-classification
slug: osm-building-classification
---

A restaurant and an apartment upstairs can share a street address while sending riders to different doors. The restaurant may open onto the sidewalk, while the apartment is reached through a shared entrance around the corner. In an [earlier devlog](/en/devlog/osm-to-unity/), we showed how we bring OpenStreetMap (OSM) footprints into Unity. This time, we tried a set of classification rules on map extracts for Ingye and Songdo to see what those footprints can tell us about facades and entrances.

## Use, building type, and access

We divided the game's classification into three levels. The broad category covers **uses such as housing, retail, and offices**. The building type distinguishes **low-rise apartment buildings, apartment blocks, and neighborhood shops**. The subtype describes **a layout that changes the facade or how people enter**. A low-rise apartment building with piloti parking has an open ground level supported by columns, with space for cars and a path to the shared entrance. A version with an enclosed stairwell can use a solid ground-floor facade and a shared door facing the alley.

- **Housing, retail, offices, and accommodation** include slab and tower apartment blocks, street-front shops and multistory retail buildings, single and multiple office towers, and hotels with sidewalk entrances or vehicle drop-offs.
- **Industry, logistics, education, research, healthcare, and welfare** include workshops with alley-facing shutters, warehouses with truck ramps, schools with classroom wings beside a yard or joined by corridors, and clinics entered from the street or through a shared stairwell.
- **Public services, culture, religion, sports, and transport** include fire stations with street-facing bays, museums in one building or across several wings, churches in commercial buildings or standalone halls, community gyms and spectator arenas, and stations with dispersed subway entrances or elevated platforms.
- **Mixed-use** buildings track floors and entrances separately. If the only detail is that uses are mixed, the floor assignments and door roles stay open. Agricultural buildings, utilities, rest facilities, specialized sites, and small outbuildings also have a place in the classification. Background structures can share simpler facades.

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
