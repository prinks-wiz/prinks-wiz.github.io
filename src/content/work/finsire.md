---
org: "Finsire Technologies"
role: "Data Science Intern"
startDate: 2024-01-01
endDate: 2024-04-30
location: "Remote"
description: "I built a forecasting pipeline over 500K+ mutual fund records using Continuous Wavelet Transform and LSTM models, then automated the ETL for the real estate and SEBI financial data feeding into it. Also shipped a TF-IDF matching system that hit 92% precision. This was my first real exposure to data pipelines running at production scale, and it showed."
techStack: ["Python", "Continuous Wavelet Transform", "LSTM", "TF-IDF", "ETL", "Pandas", "Time Series Analysis"]
---

The problem Finsire handed me was a good one: build a volatility model for mutual funds to power a loan-to-value calculation, with no historical labelled data to train on. The standard approach — a supervised model on price movement targets — was unavailable. The dataset was real, live, and had no annotations.

Returning to first principles meant returning to mathematics. Mutual fund volatility is, at its core, a property of a time series: the frequency and magnitude of sharp movements in net asset value. I took inspiration from Continuous Wavelet Transform theory, which provides a multi-resolution view of signal energy across time, and adapted it for this setting. Rather than training a model to predict labels, I used a modified CWT to identify peaks and troughs in the NAV series, then computed first and second-order derivatives to characterize the direction and rate of change at each inflection point. The result was a score that quantified volatility without any training data, running in real time on live API feeds.

The model shipped at 92% precision on a held-out validation set and was deployed in half the anticipated timeline — light enough to be embedded directly in the loan-against-mutual-funds product that subsequently secured three institutional clients. Alongside this, I built ETL pipelines processing 2,000 real estate listings and SEBI financial statements, and a TF-IDF semantic matching system that processed 50,000+ vehicle-insurance record pairs. Both shipped to production. The lesson I carried from Finsire was simple but durable: when data is scarce, mathematical structure is not a last resort — it is the first tool.
