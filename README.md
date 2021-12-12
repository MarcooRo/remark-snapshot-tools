# remark-snapshot-tools
A tools that takes the latest Singular consolidation dump and, associating whit a search key, extracts all the addresses and info that contain the NFT kay

# Installation
Needs: node +16v and npm +6<br>
Run <code>npm i</code> and <code>node main.js</code>

# How to use
Open <code>localhost:3000</code><br>
Add you Collection ID<br>
Make Snap!

# What does it do
After you push the botton the script download the latest Singular consolidation dump, we use the lite vertion.<br>
The Excel file contains this information extracted from the dump: NFT-ID, address, first sale price, block, timestamp.<br>
The file download will start automatically.<br>
For the consolidation dump look <a href='https://docs.rmrk.app/syncing#consolidation' target='_blank'>here</a>
For all Remark specs look <a href='https://github.com/rmrk-team/rmrk-spec' target='_blank'>here</a>

# Commands in make file
1) <code>make rebuildAll</code> Download the most updated dump<br>
2) <code>make produceXml</code>
3) On terminal will ask you to add the KEY to use to looking inside the dump. Like: ID-Collection '0a8ce195286c168f19-DONKEY'
4) <code>make deleteAll</code> if you want delete all last file

# What we could do in the future
We would like to improve this tools, we plan to do these things in the near future:
<ul>
    <li>
        This tools is for creators, so we plan to move everything to a public domain, so that you don't need to have technical knowledge to use it
    </li>
    <li>
        Add the possibility of taking a backdated snapshot, for example by creating an automation that downloads and keeps in memory the last 7 days of the dump
    </li>
</ul>
If you have any requests, write us!

# Sponsor by
This project was created and made public thanks to the contribution of Donkey Gang!<br>
<a href='https://singular.rmrk.app/collections/0a8ce195286c168f19-DONKEY' style='width:100%'>
    <img src='img/DonkeyGeg.jpeg' title='Donkey Geg'>
</a>
