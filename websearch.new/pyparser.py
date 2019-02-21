#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Feb 20 20:32:58 2019

@author: Gideon
"""

from lxml import html

htmllist = []
htmllist.append("\html_files/Computer\ Science\ at\ Leiden\ University\ -\ Leiden\ University.html")
htmllist.append("html_files/Home\ -\ Universiteit\ Leiden.html")
htmllist.append("html_files/Google\ Nieuws.html")
htmllist.append("html_files/IMDb\ -\ Movies,\ TV\ and\ Celebrities\ -\ IMDb.html")
htmllist.append("html_files/io9\ -\ We\ come\ from\ the\ future..html")
htmllist.append("html_files/Tom’s\ Hardware_\ For\ The\ Hardcore\ PC\ Enthusiast.html")
htmllist.append("html_files/Amazon.com_\ Online\ Shopping\ for\ Electronics,\ Apparel,\ Computers,\ Books,\ DVDs\ \&\ more.html")
htmllist.append("html_files/Hotmail,\ Outlook\ en\ Skype\ inloggen\ -\ Laatste\ nieuws\ -\ MSN\ Nederland.html")
htmllist.append("html_files/Product\ reviews,\ how-tos,\ deals\ and\ the\ latest\ tech\ news\ -\ CNET.html")
htmllist.append("html_files/Wikipedia,\ the\ free\ encyclopedia.html")
tree = html.parse("html_files/Computer\ Science\ at\ Leiden\ University\ -\ Leiden\ University.html")
print(html.tostring(tree))