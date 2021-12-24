# remark-snapshot-tools
A tools that takes the latest Singular consolidation dump and, associating whit a search key, extracts all the addresses and info that contain the NFT kay

# Installation
Needs: <a href='https://nodejs.org/it/' target='_blank'>node +16v</a> and <a href='https://www.npmjs.com/' target='_blank'>npm +6</a></br>
Run <code>npm i</code> and <code>node main.js</code>

# How to use
Open <code>localhost:3000</code><br>
If you want to set a limit time you can add a block number or leave it empty to take the actual situation<br>
Add Collection ID or a key<br>
Make Snap!

# What does it do
After you push the botton the script download the latest Singular consolidation dump, we use the lite vertion.<br>
The Excel file contains this information extracted from the dump: NFT-ID, address, first sale price, block, timestamp.<br>
The file download will start automatically.<br>
For the consolidation dump look <a href='https://docs.rmrk.app/syncing#consolidation' target='_blank'>here</a>
For all Remark specs look <a href='https://github.com/rmrk-team/rmrk-spec' target='_blank'>here</a>

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
