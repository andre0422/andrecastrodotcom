---
title: "The VBM Program - A Virtual Hospital" 
subtitle: "UI/UX Research, Product Management"
image: "vbm_img_small.jpg" 
alt: "VBM test" 
date: 2024-12-11
draft: false
---

# Introduction

*Preliminary*

I was contracted as a technical product manager at *The Rotman Research Institute Baycrest* to determine design and front end technical requirements for a virtual care platform for the *Virtual Behavioural Medicine* (VBM) program. Before I was onboarded, a clinical manager owned the product. I will briefly reviewing my experience owning this product and my approach to building this platform.

*What is the VBM Program*

The VBM program can be described as a virtual hospital for dementia patients that provides a range of services, including virtual consultations, appointments, and follow-ups. The program is designed to provide dementia patients with a range of services that are typically available in a physician hospital, but without the need to travel to a physical location -- hence why it has been dubbed as a 'virtual hospital.' The VBM program was conceived back in 2021 to address concerns around the projected increase in dementia cases and the corresponding need for admission to behavioural units or other hospital care to treat symptoms. A study investigating the efficacy of the program can be found here. 

# The Challenge

*The Problem* 

The program relies on traditional paper-based intakes/charting coupled with an existing provincial telemedicine system called the Ontario Telemedicine Network (OTN). 

Here is a high-level overview of the workflow:

1. The resident transcribes the patient's information from the hospital's electronic health record (EHR) system onto the intake form.
2. The patient, their accompanying family, healthcare providers within the patient's circle of care, and a VBM resident are conferenced virtually over OTN. 
3. The resident spends approximately 1-hour performing the initial intake.
4. The call ends when the intake concludes; the resident collects their documents and moves across the hall to the attending physician's office.
5. The resident summarizes their patient encounter for the attending. They deliberate further for educational purposes, making changes on the original intake form.
6. The attending re-conferences with the patient and the care team to perform their assessment. They continue taking notes on the original intake form the resident used. 
7. Once the call ends, the attending spends 20-mins dictating their findings. This dictation will become a consultation letter that is uploaded onto the hospital's EHR system to be distributed to the patient's circle of care. 

There are several problems with this approach:

1. The paper-based process is time-consuming
2. The paper-based process is repetitive
3. The paper-based form can be hard to refer back to in the future because of the several edits that take place during the original intake

The program relies on old-fashioned file-systems to store patient information. Administrative staff or even physicians find themselves wasting time manually copy-pasting information from the EHR into their intake 'booklets' (this is what I started calling the form, because it was quite literally a booklet rather than a form). If you've ever received a prescription or hand-written note from a physician, you must know how notoriously bad physician hand-writing can be. Compounded with medical shorthand and multiplied by the number of physicians writing on this booklet, these notes become borderline useless to anyone other than their authors. 

The VBM program at Baycrest is the only organization in the world that offers this service. There is extremely high demand for this service, with waitlists extending out months. This was not sustainable and did not align with the organization's strategy for the forthcoming years.


*Organizational Context* 

As part of Baycrest's strategy for innovation in dementia care and research, the organization wants to align itself to be a heavy adopter of machine learning and artificial intelligence (AI) tools. Concomitantly, the organization was seeking to become a leader in dementia care delivery and quality. The VBM program was a beacon that aligned with both ambitions. The program had already garnered interest from large hospital networks in Canada and international interest was brewing. 


# Objectives

*User and Organization Goals* 

1. Re-align the program to be fully digital in order to meet the organization's machine learning and AI strategy for the future. 
2. Improve the clinician experience by reducing the amount of time spent on administrative tasks. 

*Impact* 

By meeting these objectives, the VBM program can:

- Reduce wait times for patients 
- See more patients who need care
- Contribute to the organization's machine learning and AI strategy that may lead to breakthroughs in dementia care


# Brainstorming the Solution (Product Discover)

*That Damn Intake Form*

The key stakeholders set a hard requirement for 'digitizing the original intake form.' Due to clinical requirements, adherence to the properties and fields in the booklet was a non-negotiable. Furthermore, in order to set a foundation for machine learning work the data garnered from each intake, standardization and binarization of fields that were typically hand-written required careful thought. Bombarding physicians with drop-down menus and multi-tree selectors while trying to quickly collect information during an intake was far from ideal.

*Automating Consultation Letter Dictations*

This was one of the big asks for this product -- the automation of consult letter dictation. During my initial observation, this was clearly one of the largest time sinks in the entire workflow. To remove this task altogether was a game changer for clinicians. I might post an article in the near future going over the case study/process for how we tackled this problem in depth (AI-Free).

*Auto-filling Patient Information from Baycrest's EHR System*

 Baycrest uses a very (and I mean *very*) old EHR system for managing patient information. So old, in fact, that APIs were not available to allow for seamless interaction between any other software. In the initial observation I discussed earlier, this was also another considerable time sink that our solution would need to eliminate. 


# Understanding Our Users

*Participant Observational Studies*

Having an educational background in health sciences, I wanted to leverage my knowledge of research design for the initial stages of product discovery. The thought-process was to identify underlying weaknesses with the current workflow and behaviours that the clinicians had adapted overtime to overcome some of the weaknesses.

Here is what our study design looked like:

1. Shadow one resident clinician during their entire intake process
2. At the end of the observation, ask the resident to reflect on their experience. 
3. Shadow the resident during their turnover to the attending physician
4. Once this has concluded, switch and shadow the attending
5. At the end of the observation, ask the attending to reflect on their experience

*Design Sprints*

We used the information obtained from the observational studies to serve as a foundation for design sprints. Google has a great design sprint methodology that we used to iterate very quickly. Here is breakdown of the framework we used to guide feature ideation and development:

1. Understand
	1. 'How might we' prompting
	2. Experience mapping
	3. User interviews
2. Define
	1. Success metrics
	2. Signals
3. Decide
	1. Low-fidelity protoyping
4. Prototyping
	1. High-fidelity prototyping
5. Validate
	1. Stakeholder review
	2. Technical review
	3. Cognitive walkthroughs

# Final Remarks

This is a quick overview of my approach to how I approached the management of the Rotman Research Institute's new VBM portal. Feel free to get in touch if you would like to learn more.
