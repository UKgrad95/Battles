# Battles
Battle sites in the USA and just across the border

# 🚀

# Project proposal

1. Description of data topic (with an anticipated map title):

    What? - Map of potentially all known Battle Sites, Battlefields, or conflicts in the United states and perhaps some just outside the US border (i.e. across the border in Mexico or Canada)

    Where? - All sites within the United States to include Hawaii and Alaska.  So essentially all 50 states.  Some site just across the border in Mexico and Canada.

    When? - Battle Sites that have occurred during times of war to include the following:
       a. French & Indian War - King William's War (1688-1697)
       b. French & Indian War - Queen Anne's War (1702-1713)
       c. French & Indian War - War of Jenkins' Ear (1739-1748)
       d. French & Indian War - King George's War (1744-1748)
       e. French & Indian War - Seven Year's War (1754-1763)
       f. American Revolution (1775-1783)
       g. War of 1812 (1812-1815)
       h. Indian Wars (1609-1924)
       i. Mexican War (1846-1848)
       j. Civil War (1861-1865)
       k. World War II (1939-1945)
       l. Insurrections & Rebellions (varies)
    This will be the various war timelines that the user will be able to choose from and differentiate.

    Tentative Title: Battle Sites of the U.S.

2. Map objectives and user needs:

    Why does the map need to be made?    The only map I have ever seen that contained all known battle sites is the 1967 version.  However, even it is missing a few battles for during my research I have come across several battles that are not depicted on the 1967 map.  So my purpose is to not only recreate the 1967 map but also update it, include other battle sites that were not found on the 1967 map, and include the various battle site names (i.e. Battle of Bull Run is also known as the Battle of Manassas).  And by creating an interactive map, one can gain access to information about the battles through various web links and tooltips.  Initially this info will be simplistic and general.  But likely after this course, I will make things more detailed and include more info like links to old battle maps, pictures of historical markers, and detailed names of the belligerents (i.e. Custer vs Sitting Bull etc.)

    User Persona:  Most military history buffs as well as archeological buffs would find it interesting to know where various battles have occurred and might be surprised at the vast number of them and where they are located.  Also as a former military science instructor knowing where and about some of these battle sites can aide in the field trips and staff rides that are conducted.

    Imagined scenario:  
    If I were studying or wanting information on a particular battle site then I could use this interactive map to get the general location, dates and various information from the web links and tooltips.
    If I just wanted to know if there were any military battlefields nearby that I could plan a visit this map would be quite useful as well.  Also I can see from those links if the sites are protected or managed by the National or State park system.  Some sites are not protected and several do not even have a historical marker.  This map could aide many historical preservation societies in their quest to preserve history.  Like the American Battlefield Trust (battlefields.org).

3. Data Source(s): 

    a. 1967 Battle Sites Map compiled by the US Geological Survey.  (See us_battle_sites_usgs_1967.jpg)

    b. Each site is being looked up via the internet.  Many have one or more sites that have information about the battle.  (i.e. Wiki, National Park Service, State Parks, etc.)

    c. Latitude and Longitude site locations are being researched and confirmed or approximated via Google Maps with the information derived from websites that contain information about the battle sites.

    d. An excel spreadsheet is being created and will be converted into a CSV file for use.  (See BattleSites.xlsx)


4. Current and Future Content:

    a. The user will hopefully be able to display all battle sites at once or turn on and off the different war timelines (see When? in #1).  When the user scrolls over the site location a tooltip/popup should contain the Battle site name, date or year, associated war/conflict, and the main belligerents as well as a link to at least one web site for more info.  If time permits then I may include a slider that can associate with the year (but maybe not).

    b.  Eventually, a link to either a photo, battle map, or historical marker might be incorporated.  Ongoing future updates to the map will include adding many battle sites that are actually missing from the 1967 map.  I will add as many missing sites as possible but most likely will not be able to add them all.  Also would like to eventually add a selector that would display which sites are run by the National Park Service and which are run by State or Local governments.

    c. Technology Stack:
        - QGIS will be used initially to ensure locations come in properly and to help facilitate the proper conversion of the .xlsx to .csv file.  

        Two versions will be attempted:
        - Leaflet Version: Most likely will use a Mapbox basemap as there might be one that closely resembles the old 1967 map.
        - Leaflet Version: JS, HTML, CSS will all be used as per previous lessons.  not sure yet if I will create separate js and css files from the html index or not yet.
        - D3 Version: Will be used.  Appropriate projection and colors will be experimented with.
        - Hosting platform will be GitHub and eventually incorporated into my portfolio at https://ukgrad95.github.io/