---
title: "Cloud-Native Twitter Recommendation Engine"
slug: "aws-twitter-recommender"
summary: "Kubernetes microservice architecture serving a Twitter recommendation engine at 8,700+ RPS with 93.5% correctness, achieving 41.7x throughput improvement through systematic bottleneck elimination."
date: 2026-01-01
techStack: ["Kubernetes", "AWS", "kOps", "MySQL", "InnoDB", "GitHub Actions", "Helm", "ARM Graviton"]
featured: false
stat: "8,700+ RPS · 93.5% correctness · 41.7x throughput improvement"
tags: ["INFRASTRUCTURE"]
cardDescription: "A Kubernetes recommendation service that had to hit 8,700 RPS at 93.5% correctness on ARM Graviton instances, at minimum cost. Starting from ~200 RPS, I profiled and eliminated bottlenecks in sequence: schema denormalization (3.5x gain), InnoDB buffer pool tuning (cache hits from 60% to 98.4%), prepared statement caching, and auth TTL optimization. 41.7x throughput improvement. The infrastructure rebuilds from scratch in under 8 minutes."
---

## Overview

The premise of this project was simple and adversarial: build a recommendation service that can sustain 8,700 requests per second at 93.5% correctness, on a heterogeneous cluster of ARM-based AWS Graviton instances, at the lowest possible cost. The starting point was a functional but naive service that handled maybe 200 RPS. The 41.7x improvement between those two numbers was, as these things usually are, not one insight but a sequence of bottleneck removals — each one revealing the next.

## Architecture

The service runs on a Kubernetes cluster provisioned with kOps on AWS, behind a Network Load Balancer. The recommendation engine itself is a read-heavy service querying a MySQL backend; the dominant cost at low throughput was database access, and that remained true all the way to 8,700 RPS, just at different layers.

## Systematic Optimization

Schema denormalization came first. The original schema had normalized relationships that required multi-table joins on every recommendation query. Denormalizing the hottest read paths gave a 3.5x throughput improvement immediately — not through any clever engineering, but by simply reducing work.

InnoDB buffer pool tuning followed. Profiling showed cache hit rates below 60% under load. Sizing the buffer pool correctly for the working set and monitoring with `SHOW ENGINE INNODB STATUS` pushed the cache hit ratio to 98.4% — queries that had been going to disk were now in memory, and latency dropped proportionally.

Prepared statement caching removed query parsing overhead from the hot path. Auth token TTL, set to 45 seconds, reduced authentication overhead by 95% — a surprisingly large fraction of total request cost had been in token validation on every call.

## CI/CD and Operations

The deployment pipeline uses GitHub Actions with Helm charts for all service manifests. Deployments are immutable: every release is SHA-tagged, and the pipeline supports conditional database initialization so cluster recreation (possible in under 8 minutes) does not require manual state management. NLB-based traffic routing handles the rest. The infrastructure is designed to be reproducible from scratch, which matters more than it might seem when the cluster is in someone's AWS account on a course deadline.
