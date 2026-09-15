---
title: "Physics-Based Motion Prediction via Neural ODE-VAE"
slug: "motion-prediction-ode-vae"
summary: "Novel Neural ODE-VAE hybrid architecture for physically consistent trajectory prediction, improving 75% over baseline on the PhysicsGen dataset after benchmarking GANs, diffusion models, and Pix2pix."
date: 2025-09-01
techStack: ["PyTorch", "Neural ODEs", "VAE", "GANs", "Diffusion Models", "Trajectory Prediction"]
featured: false
stat: "75% improvement over baseline · PhysicsGen dataset · Neural ODE-VAE"
tags: ["STATE ESTIMATION", "EVALUATION"]
cardDescription: "Trajectory prediction that obeys physics. I benchmarked GANs, diffusion models, and Pix2pix on the PhysicsGen dataset before designing a Neural ODE-VAE hybrid that enforces physical consistency in latent space rather than treating it as a post-processing constraint. 75% improvement over baseline. The key insight: physics belongs in the architecture, not the loss function."
---

## Overview

Trajectory prediction is a problem that sits at the intersection of two things that are hard to reconcile: the flexibility of learned generative models and the hard constraints of physical dynamics. A diffusion model can produce visually plausible trajectories that violate conservation of momentum. A physics simulator produces physically correct motion but cannot generalize to novel environments. This project's premise was to ask whether those two properties could be combined in a single architecture, rather than traded off against each other.

## Benchmarking Phase

The project began with a systematic evaluation of generative approaches on the PhysicsGen dataset — a collection of trajectory sequences from physically simulated environments. I implemented and benchmarked four model classes: GANs (vanilla and conditional), Pix2pix for frame-to-frame prediction, diffusion models (DDPM), and a standard VAE baseline. Each was evaluated on trajectory consistency, distribution coverage, and physical plausibility (measured by energy conservation deviation across predicted paths).

The benchmark revealed a consistent pattern: purely image-based generative models produced visually coherent outputs but showed systematic violations of physical constraints in multi-step rollouts. The errors compounded — a small violation at step 3 amplified to an implausible trajectory by step 10.

## The Neural ODE-VAE Architecture

The proposed architecture addresses this directly by replacing the VAE decoder's feedforward MLP with a Neural ODE. The latent variable encodes the initial state distribution; the ODE solver advances that state forward in time, with dynamics parameterized by a learned neural network. The key insight is that the ODE formulation imposes continuity by construction — the model cannot make discontinuous jumps between timesteps — while the VAE latent space preserves expressivity for capturing distribution uncertainty.

Training requires differentiating through the ODE solver, which uses the adjoint sensitivity method to make that tractable without storing intermediate states.

## Results

The Neural ODE-VAE improved 75% over the baseline VAE on the PhysicsGen evaluation metrics, with the largest gains on sequences involving collisions and multi-body interactions — precisely the cases where physical consistency matters most. The diffusion model, despite producing the highest visual quality on static frames, ranked last on trajectory consistency under extended rollout.
