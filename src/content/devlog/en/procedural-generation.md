---
title: "Generating a delivery neighborhood from map data"
description: "Rules for turning roads and building footprints into a neighborhood you can deliver in."
date: 2026-11-04
author: Mechureal
game: broke-rider-simulator
tags: [development]
draft: false
lang: en
translationKey: procedural-generation
slug: procedural-generation
---

Roads and building footprints are a starting point. Procedural generation gives roads width and turns footprints into three-dimensional buildings. The plan is to use defaults for details the map may leave out, such as floor counts.

A building can look fine and still be unreachable. Pickup and drop-off candidates should sit on connected parts of the road network. The first pass will use a small area to find disconnected roads and unreachable destinations, then rerun the same inputs as the generation rules improve.
