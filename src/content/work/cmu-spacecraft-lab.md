---
org: "Carnegie Mellon University — Space Research Argus"
role: "Graduate Researcher"
startDate: 2025-10-01
endDate: null
location: "Pittsburgh, PA"
description: "I'm building the computer vision pipeline for a NASA-class CubeSat mission: fine-tuning EfficientNet on 100K+ Sentinel-2 satellite images, then quantizing it to INT8 so it runs on a Jetson Orin NX under 5W. Custom GPU kernels took training from 28 hours to 2.5 minutes, a 672x speedup I still don't fully believe. I'm a credited contributor on the Argus 2 mission manifest, and I'm co-authoring the requirements for Argus 3 now."
techStack: ["PyTorch", "EfficientNet", "INT8 Quantization", "NVIDIA Jetson Orin", "CUDA", "Sentinel-2", "Google Earth Engine"]
---

The first question that draws a researcher toward on-orbit inference is the same one that makes it hard: what does it mean for a model to be reliable when you cannot patch it? Cloud systems tolerate failure through redundancy and rapid iteration. A CubeSat in low Earth orbit tolerates nothing — a locked inference loop or an out-of-distribution input that consumes too many cycles can end a mission in seconds.

My work in the Space Research Argus lab at CMU centers on building a perception pipeline that can handle this constraint honestly. I fine-tune EfficientNet-B4 on over 100,000 Sentinel-2 multispectral images, classifying geographic regions across 15 categories that matter for mission planning. The model achieves reliable high-fidelity classification — but getting it to run at power is the harder half of the problem.

The 700x speedup we achieved came not from a single optimization but from systematic pressure on every layer of the stack: custom CUDA kernels for the attention operations that TensorRT's default paths handle inefficiently, INT8 quantization with a carefully constructed calibration set, and structured pruning that removed 65% of parameters while preserving accuracy within a narrow tolerance. The result runs under 5W sustained on a Jetson Orin NX — within the mission power envelope with margin to spare.

I also built the simulation environments that validate the pipeline before any hardware integration: generating synthetic out-of-distribution scenarios with Google Earth Engine data to confirm that the model degrades gracefully rather than catastrophically on unseen inputs. Reducing validation errors by 30% before hardware testing is the kind of insurance that matters when the hardware is eventually in orbit.
