---
title: "Bringing OpenStreetMap data into Unity"
description: "Turning geographic coordinates into Unity world positions for roads and building footprints."
date: 2026-11-04
author: Mechureal
game: broke-rider-simulator
tags: [development]
draft: false
lang: en
translationKey: osm-to-unity
slug: osm-to-unity
---

OpenStreetMap records roads and buildings in latitude and longitude. To use that data in Unity, the plan is to pick a local origin and convert each point to an offset in meters. East and north map to the world X and Z axes.

Roads come in as sequences of connected points, while buildings use closed outlines. Drawing those shapes as simple lines is a first check: roads that share an intersection on the map should meet at the same point in Unity.
