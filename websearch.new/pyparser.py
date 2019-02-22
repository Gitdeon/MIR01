#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Feb 20 20:32:58 2019

@author: Gideon
"""

from bs4 import BeautifulSoup
from lxml import html
import time
import re

htmllist = [] #create and fill list with html sources
htmllist.append("html_files/Computer Science at Leiden University - Leiden University.html")
htmllist.append("html_files/Home - Universiteit Leiden.html")
htmllist.append("html_files/Google Nieuws.html")
htmllist.append("html_files/IMDb - Movies, TV and Celebrities - IMDb.html")
htmllist.append("html_files/io9 - We come from the future..html")
htmllist.append("html_files/Tom’s Hardware_ For The Hardcore PC Enthusiast.html")
htmllist.append("html_files/Amazon.com_ Online Shopping for Electronics, Apparel, Computers, Books, DVDs & more.html")
htmllist.append("html_files/Hotmail, Outlook en Skype inloggen - Laatste nieuws - MSN Nederland.html")
htmllist.append("html_files/Product reviews, how-tos, deals and the latest tech news - CNET.html")
htmllist.append("html_files/Wikipedia, the free encyclopedia.html")

tic = time.clock()

links = []
for i in range(0,10):  #loop over html pages
   soup = BeautifulSoup(open(htmllist[i]), "html.parser") #load page into parser object
   print("\n Links on ", htmllist[i], ": \n\n")
   for x in range (0,1000):
      for link in soup.findAll('a', attrs={'href': re.compile("^https://")}):
         links.append(link.get('href')) #retrieve links
         print(*links, sep = "\n")
         links = []
         
elapsed_time = time.clock() - tic
print("Elapsed_time :", elapsed_time);
