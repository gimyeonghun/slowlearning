---
title: "Excel to Calendar Script"
date: 2021-03-08T13:47:26+11:00
type: post
tags: ["scripts"]
---

One of the motivations for writing a blog was to post scripts and write about them, much like [Dr Drang](https://leancrew.com).

Today, I have one such opportunity.

I'm recently starting a course and the admin gave the timetable in an excel spreadsheet. Each sheet represents a weekday. This is kind of uncomfortable to read and I assumed that I would have to add it to my calendar anyways at some point or other. Well, I've been learning AppleScript over the past few weeks, so what better way then to show off what I've learnt!

Here's the code in its all glory:

```applescript

set last_cell to ""
set start_range to ""
set end_range to ""
set d to ""

tell application "Numbers"
	set hi to table 1 of active sheet of front document
	set ho to cell range of hi
	repeat with r in rows of ho
		set row_num to address of r as number
		if row_num > 2 and row_num mod 2 is 1 then
			repeat with C in cells of r
				set current_cell to formatted value of C as text
				if name of column of C is "B" then 
					set d to word 1 of current_cell & space & word 2 of current_cell
					if word 2 of current_cell is "Jan" then
						set d to d & " 2022"
					else
						set d to d & " 2021"
					end if
					set d to AppleScript's date d
				else if name of column of C > "B" and name of column of C ≤ "U" and current_cell is not "missing value" then
					if last_cell is current_cell then
						set end_range to name of column of C as text
					else
						if start_range is not "" then
							set s_d to (value of cell 1 of column start_range of hi) as text
							set e_d to (value of cell 1 of column end_range of hi) as text
							
							if e_d is not "Date" and e_d is not "Week" then
								
								set s_d to word 1 of s_d as number
								if s_d is 12 or (s_d ≥ 1 and s_d ≤ 5) then
									set s_d to date ((s_d as text) & ":00PM") of d
								else if s_d ≥ 8 and s_d ≤ 11 then
									set s_d to date ((s_d as text) & ":00AM") of d
								end if
								
								if (count of words of e_d) is 3 then
									log e_d & " has 3 items"
									set e_d to date (word 2 of e_d & ":00" & word 3 of e_d) of d
								else if (count of words of e_d) is 4 then
									log e_d & " has 3 items"
									set e_d to date (word 3 of e_d & ":00PM") of d
								else if (count of words of e_d) is 2 then
									log e_d & " has 3 items"
									set e_d to item 1 of word 2 of e_d as number
									if e_d is 12 or (e_d ≥ 1 and e_d ≤ 5) then
										set e_d to date ((e_d as text) & ":00PM") of d
									else if e_d ≥ 8 and e_d ≤ 11 then
										set e_d to date ((e_d as text) & ":00AM") of d
									end if
								end if
								
								set summary to last_cell & space & s_d & "-" & e_d & " /School"
								tell application "Calendar"
									set dds to make new event at end of events of calendar "School" with properties {summary:last_cell, start date:s_d, end date:e_d}
								end tell
							end if
						end if
						set start_range to name of column of C as text
						set end_range to start_range
					end if
					set last_cell to current_cell
				end if
			end repeat
		end if
	end repeat
end tell

```

I'm not going to lie, it's an ugly piece of shit. I could have tidied it by writing functions, but I felt stubborn about writing everything in one module. This may have been my downfall.

One of the reasons why the code is so convoluted is because I had to account for a lot of random logic in the spreadsheet. The visual presentation may look nice, but it was very difficult to parse. Each calendar event was actually 2 cells merged together, so I had to ensure that the same event was added to my calendar twice. Additionally, I realised that the other sheets had a 8-6pm day compared to a 8-5pm day, so the code that checked the range of calendar events had to be modified (another weird thing: the calendar events were prefixed and suffixed with the date and calendar weeks? so checking those boundaries was something I had to check).

The hardest part was converting the data from 1 type to another. I ran into a syntax error because I tried to convert a string into a date object, but because I was working within a `tell` statement, I had to prepend the `Applescript's` keyword so that Applescript didn't get confused with the `date` command supplied by Numbers. 

One last hurdle was that I tried to take a shortcut by using Fantastical and its natural language parser so I didn't have to do too much data wrangling. But the parser was very finicky so I had to feed everything into Calender anyways. 

I might revisit this post and write more about my challenges, as well as create a more elegant solution in the future. I know I'll have to look at the code again because the timetable will be updated again in June for the second half of the year. But I'm glad it's working so far, and my calendar is looking very busy.
