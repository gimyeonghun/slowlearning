---
layout: ../../layouts/blog_post.astro
title: CBCT
published_date: 2023-05-23T07:28:35.653974+00:00
---

Here's something that may surprise you: apart from having a special interest in Swift/SwiftUI, I spend the majority of my other time studying dentistry. In fact, I have been doing this for 3 years now! But a healthy dose of imposter syndrome meant that I never really knew what to write about. However, I think I finally found my first topic: my CBCT Observation experience.

CBCT ([Cone Beam Computed Tomography](https://en.wikipedia.org/wiki/Cone_beam_computed_tomography)) is a medical imaging technique that provides a 3D image into the patient's mouth. It stitches multiple images captured together to build that view and you can navigate in X, Y, Z axis. The information provided is so detailed that you can literally see **everything**. In fact, the information is so detailed that you can determine if a patient has an allergy or an actual odontogenic infection based on the mucosal thickening of their maxillary sinus. As a result, it's not surprising that they are mainly used for implant treatment planning and endodontic treatment.

While going through 5 cases, the radiologist and I also talked about the implications of AI and CBCT. We thought that it would be interesting for the AI to provide differential diagnoses based on the data. I currently know that there's one company covering this space, as mentioned by this [podcast](https://www.truedentalsuccess.com/the-dentalpreneur-podcast/1545-ai-in-dentistry/).

During the session, I started thinking whether there's a way to read/parse CBCT files aka DICOM file format. A quick search on [Github](https://github.com/topics/cbct) yields not much.   A google search shows this [systematic review](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3222558/), which shows that DICOM mostly remains an unstandardised format. I would like to have a holiday where I can build a rudimentary CBCT reader. It's far fetched, but I think it would be a really interesting side project.
