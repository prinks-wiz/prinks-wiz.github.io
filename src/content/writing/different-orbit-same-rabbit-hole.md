---
title: "Different Orbit, Same Rabbit Hole"
date: 2026-09-14
summary: "Skild AI's S1 does in-context learning for long-horizon robotics tasks. Put that next to EgoVerse, and the missing internet for physical AI starts to look solvable."
tags: ["physical AI", "robotics", "in-context learning", "computer vision"]
category: tech
draft: false
---

This was idle browsing. Sometimes you come across something that makes you stop and just go: Wow.

[Skild AI](https://www.linkedin.com/company/skildai/)'s S1 was that moment.

According to their blog post, S1 does in-context learning for long-horizon tasks. Show it a single video of a task it's never seen, up to ten minutes long, and it can just do it. No fine-tuning. No post-training. No thousands of teleoperation demos. In Skild's own controlled study, one video prompt got S1 to 66% success on unseen tasks, compared to 9% for a language-prompted model trained on the exact same data. One demonstration did roughly the work of 380 hand-collected ones. The first time S1 flipped a pancake, the team checked their own training data to see if pancake flipping was in there. It wasn't.

This might be one of those moments we look back on and say, "That's when it started to change."

There is a thought: Physical AI doesn't have an internet to learn from.

Language models had the entire written web. Robots have whatever teams like Skild can painstakingly collect, one demonstration at a time. That scarcity is the actual bottleneck behind everything happening in this field right now.

My rabbit hole this week led me to [EgoVerse](https://egoverse.ai/), a consortium trying to build something like that missing internet. A shared, large-scale library of real-world physical activity for robots to learn from.

Put the two ideas side by side. In-context learning that generalizes to tasks it's never seen. A real, growing corpus of real-world data to learn from. Together they start to look like the two halves of the same unlock.

If both keep compounding, I don't think we're decades from a watershed moment in robotics. I think we're a few years out.

Part of what I love about being at CMU is getting to have this exact conversation with people who actually work on this stuff. In class, in the hallway, over bad coffee. My own research lives in a strange corner of the same problem.

I work on visual localization for a research satellite, teaching a spacecraft to figure out where it is from what its camera sees. A different physical world than a kitchen counter. But the tools underneath are closer than you'd think. Pose estimation. Depth. Matching what a camera sees against what's actually true. Lately I've been thinking about whether the frames I work with, sequences of satellite imagery, could be trained the same way. Not just localizing a single image, but predicting a path across many, the way S1 watches a demonstration and learns the shape of a whole task.

Different orbit. Same rabbit hole.

---

**References**

- Skild AI. *Introducing S1: In-Context Learning for Robotics.* August 2026. [skild.ai/blogs/s1](https://skild.ai/blogs/s1)
- [EgoVerse](https://egoverse.ai/)
- Generalist Team. *GEN-1.5: Embodied Foundation Models are One-Shot Learners.* Generalist AI Blog, August 2026.
