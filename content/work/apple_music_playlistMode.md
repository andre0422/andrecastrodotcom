---
title: "Apple Music - Playlist Mode" 
subtitle: "UI/UX Research, Product Management"
image: "n/a" 
alt: "AM - Playlist Mode Img" 
date: 2025-12-19
draft: false
---

## 1. Executive Summary & Objective

**Problem:** Manual playlist curation is a high-friction task that requires users to break their "flow state."

**Objective:** To enable "Passive Curation" by leveraging implicit user signals (play-through vs. skip) to automatically build personalized playlists, specifically for deep-work or exploration sessions.

## 2. User Stories

- **As a focused worker,** I want my music player to remember the songs I liked without me having to switch apps, so I can stay productive.
    
- **As a traveler,** I want to create a "soundtrack" of my trip based on what I actually listened to, so I can reminisce later with zero manual effort.



## 3. Technical Requirements & Considerations

### 3.1 Curation Logic (The "Skip" Threshold)

To differentiate between a "liked" song and "background noise," the system must apply a logical threshold rather than a binary 0/1 rule.

- **Positive Signal (Add):** Song is added to the target playlist if `Play_Time >= 75%` of total duration OR if the song reaches the final 30 seconds.
    
- **Negative Signal (Ignore):** Song is excluded if a `Manual_Skip` event occurs before the 75% threshold.
    
- **Edge Case:** If a song is "Repeat" played, it should not be added multiple times (logic: `If Title_ID exists in Playlist_ID, Skip Add`).
    

### 3.2 Algorithm Feedback Loops ("Made for You")

This feature should not just be a siloed list; it should act as a high-intent training signal for the **Apple Music Discovery Engine**.

- **Weighting:** A song added via "Playlist Mode" should be weighted similarly to a "Love" (favorite) action in the `Recommendation_Score` metadata.
    
- **ML Integration:** These playlists provide "ground truth" data for Collaborative Filtering. If users frequently add specific "Passive" tracks, the algorithm identifies these as "sticky" discovery content for similar user clusters.
    

### 3.3 System Architecture & Syncing

- **Offline Resilience:** For travelers, the "Add" event must be cached locally in a `Pending_Curation` queue and synced to the iCloud Music Library once a stable connection (WiFi/LTE) is established.
    
- **UI/UX Interaction:** The "Playlist Mode" toggle should reside in the "Now Playing" ellipsis menu and the Control Center for rapid access.



## 4. Success Metrics (KPIs)

| Metric | Definition | Goal |
| :--- | :--- | :--- |
| **Curation Depth** | Avg. number of songs added per "Playlist Mode" session. | > 5 songs/session |
| **Feature Retention** | % of users who re-enable the mode within 14 days of first use. | 25% |
| **Discovery Conversion** | % of "Passive" songs that are later searched for or shared. | > 10% |
