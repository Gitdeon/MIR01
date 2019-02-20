#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Feb 20 20:32:58 2019

@author: Gideon
"""
from lxml import etree
from lxml import html

html = etree.HTML("html_files/Amazon.com_ Online Shopping for Electronics, Apparel, Computers, Books, DVDs & more.html")
result = etree.tostring(html, pretty_print=True, method="html")