---
org: "Sri Sivasubramaniya Nadar College of Engineering"
role: "Undergraduate Researcher — Deepfake Detection"
startDate: 2023-09-01
endDate: 2024-04-30
location: "Chennai, India"
description: "I built a deepfake detection pipeline that catches audio-visual mismatches, combining 2D ResNet-18, a Conformer, and transformer decoders. It got selected for IEEE CADEIS 2024 out of 750 submissions, and we walked away with the Best Paper Award, runner-up."
techStack: ["PyTorch", "ResNet-18", "Conformer", "Wav2Lip", "Transformers", "Computer Vision"]
---

The deepfake detection project started with a question that felt personal: what happens when a technology designed for something creative — in this case, video synthesis — is repurposed to mislead? The problem resonated because it sits at exactly the intersection I care most about: the gap between what a model can do and what it should be trusted to do in deployment.

The technical challenge was audio-visual synchronization. Deepfake videos frequently exhibit a mismatch between lip movement and the corresponding audio, with literature suggesting error rates above 20% in manipulated content. Our pipeline addressed this with a three-stage architecture: a Conformer for audio transcription, 2D ResNet-18 for video feature extraction, and a transformer decoder to compute word error rate between the audio transcript and the lip movement reconstruction via Wav2Lip. We set our detection threshold at 40% WER to account for legitimate model variability — conservative enough to avoid false positives while remaining sensitive to manipulated content.

The research was accepted to the IEEE International Conference on Advances in Data Engineering and Intelligent Systems (CADEIS 2024), selected as one of 130 papers from 750 submissions. We received the Best Paper Award (Runner-Up) at the conference — an outcome that mattered less for the credential than for the confirmation that the problem framing held up under peer scrutiny. The work reinforced something I have believed since: safety is not a property you add to a model after it works. It has to be the design constraint from the start.
