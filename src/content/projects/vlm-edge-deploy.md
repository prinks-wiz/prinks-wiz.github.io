---
title: "Data Influence for Vision-Language Models"
slug: "vlm-data-influence"
summary: "LoRA fine-tuning on LLaVA-1.5-7B to diagnose label-source mismatch in autonomous driving. 3.5x accuracy gain over vision-only baselines across 16K+ driving samples."
date: 2026-02-01
techStack: ["PyTorch", "LoRA", "LLaVA-1.5-7B", "Qwen2.5-VL", "A100", "Autonomous Driving", "VQA"]
featured: true
stat: "3.5x accuracy over vision-only baseline · 16K+ driving samples · A100"
tags: ["VISION", "MULTIMODAL", "GENERALIZATION"]
cardDescription: "Most autonomous driving datasets label actions from GPS waypoints, not what the camera sees. I built a VQA pipeline using LLaVA-1.5-7B and Qwen2.5-VL to inject visual navigation context into the training signal, diagnosing and correcting the label-source mismatch. LoRA fine-tuning kept the run tractable on a single A100. Result: 3.5x accuracy over vision-only baselines across 16K+ driving samples."
---

## Overview

Training a vision-language model to predict driving actions sounds straightforward until you look at how the labels are generated. In most autonomous driving datasets, action labels come from GPS waypoints — the coordinates of where the vehicle went. The model, however, sees images. This creates a quiet mismatch: the training signal is derived from a source that is entirely invisible to the model during inference. Understanding whether this label-source conflict was degrading performance — and by how much — became the central question of this project.

## The Problem

The mismatch is subtle because it does not cause obvious failure. A model trained on GPS-derived waypoint labels will learn to predict plausible trajectories, and its validation accuracy on held-out samples from the same distribution will look reasonable. The problem surfaces when the visual scene contains information that the waypoint label does not capture: a pedestrian crossing, a vehicle merging, a lane change visible in the image but not reflected in the GPS path.

I diagnosed this by building a VQA pipeline that augmented the training labels with navigation context derived directly from the visual input. Integrating LLaVA-1.5-7B and Qwen2.5-VL as the reasoning backbone, the pipeline answered structured questions about the scene — what is the road geometry? what are the relevant obstacles? — and incorporated those answers into the action prediction task.

## Training and Optimization

LoRA reduced the trainable parameter count to under 2% of the 7B parameter base, making the fine-tuning tractable on a single 40GB A100. Seven targeted optimizations were applied to make that single GPU sufficient: gradient checkpointing, TF32 mixed precision, 8-bit AdamW, and careful batch sizing to maintain gradient quality. Training time dropped from multi-day estimates to hours.

## Results

Across 16,000+ driving samples, the VQA-augmented pipeline achieved 3.5x accuracy over vision-only baselines — not because the model architecture changed, but because the labels became honest. The navigation context provided ground truth that the GPS waypoints could not. This is, in some ways, a data engineering result more than a modelling result. The model was never the problem; the training signal was.

The project is ongoing. Current work focuses on quantifying which scene categories benefit most from the VQA augmentation, and whether the pipeline can be adapted for other sensor modalities where label-source mismatch is endemic.
