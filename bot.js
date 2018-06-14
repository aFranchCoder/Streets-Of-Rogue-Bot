const Discord = require('discord.js');
var fs = require('fs');
var bot = new Discord.Client();
var myToken = '.............................................................';
var data = "";
var prefix = ("/");


var chenilleMin = 5;
var chenilleMax = 11;
var chanceMusicien = 2;
var maxSpam = 30;   
 
var characters = [ 'Zombie' , 'Wrestler' , 'Worker' , 'Werewolf' , 'Vampire' , 'UpperCruster' , 'Thief' , 'Supercop' , 'Soldier' , 'SlumDweller' , 'Slavemaster' , 'Slave' , 'Shopkeeper' , 'Shapeshifter' , 'Scientist' , 'ResistanceLeader' , 'OfficeDrone' , 'Musician' , 'Mobster' , 'Jock' , 'InvestmentBanker' , 'Hacker' , 'Guard' , 'Gorilla' , 'Ghost' , 'GangsterBlahd' , 'GangsterCrepe' , 'Firefighter' , 'DrugDealer' , 'Doctor' , 'CopBot' , 'Cop' , 'Comedian' , 'Clerk' , 'Cannibal' , 'ButlerBot' , 'Bouncer' , 'Bartender' , 'Assassin','Alien'];
var gangster = ['GangsterCrepe' , 'GangsterBlahd'];
var mobster = ['Mobster'];
var mobsterFollower = ['Musician', 'DrugDealer', 'Thief', 'Slave' , 'GangsterCrepe' , 'GangsterBlahd'];

var mainRoleName = ["Werewolf","Soldier","Cop","SlaveMaster","Gangster Crepe","Gangster Blahd","Drug Dealer","Gorilla","Slum Dweller","Assassin","Bartender","Cannibal","Comedian","Doctor","Hacker","Investment Banker","Jock","Scientist","Shapeshifter","Shop Keeper","Thief","Vampire","Wrestler","Zombie"];
var mainRoleId = [];
var mafiaRole = "";
var engagedMafiaRole = "";
var moneyRole = "";
var alienRole = "";
var invisibleRole = "";
var randItem = ["knife","bat","axe","pistol","rocket launcher","machine gun","taser","grenades","rocks","banana peels","mood ring","boombox","friend phone","cigarette lighter","hacking tool","four-leaf clover","translator","cigarettes","muscly pills","sugar","banana","bacon cheeseburger","whiskey","beer"];
var randEffect = ["became Red","became Orange","became Yellow","became Green","became Blue","became Purple","became Grey","became Cheesy","became Alcoholic","got the effect Acid","became Accurate","got the effect Crazy Dizzy","got the effect Electro Touch","became Enraged","became Fast","became Frozen","became Giant","became Invincible","became Invisible","got the effect Nicotine","became Poisoned","Regenerate Health","got the effect Resurrection","became Shrunk","became Slow","got the effect Strength",""];
var serv = "";
var botOwner = "";

var suggestion = "";
var suggestionGalery = "";
var suggestionLog = "";

var modding = "";
var moddingGalery = "";
var moddingLog = "";

var art = "";
var artGalery = "";
var artLog = "";

var blackMarket = "";
var offTopic = "";

var nextSuggestionTime = 0;
var suggestionMessage = [];
var suggestionMessageTop = ["","",""];
var thirdSuggestionLike = 0;

var nextModTime = 0;
var moddingMessage = [];
var moddingMessageTop = ["","",""];
var thirdModdingLike = 0;

var nextArtTime = 0;
var artMessage = [];
var artMessageTop = ["","",""];
var thirdArtLike = 0;

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// SETUP DU BOT //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

bot.on('ready', () => {
    loadData();
    bot.user.setPresence({ game: { name: ' with SoR emojis ('+prefix+'help)', type: 0} });

    serv = bot.guilds.find("id","438051720174632970");
    botOwner = serv.members.find("id","214090561055883267").user;

    suggestion = bot.channels.find("id","448721973518794762");
    suggestionGalery = bot.channels.find("id","453625034225876993");
    suggestionLog = bot.channels.find("id","453945487825960962");

    modding = bot.channels.find("id","454361129905291275");
    moddingGalery = bot.channels.find("id","454361023495929872");
    moddingLog = bot.channels.find("id","454362887188905985");

    art = bot.channels.find("id","454361073043111946");
    artGalery = bot.channels.find("id","454360477087039500");
    artLog = bot.channels.find("id","454362800815472644");

    offTopic = bot.channels.find("id","454612330228088833");
    blackMarket = bot.channels.find("id","453076353286275072");
    engagedMafiaRole = serv.roles.find("name","Engaged in Mafia");
    mafiaRole = serv.roles.find("name","Mobster");
    moneyRole = serv.roles.find("name", "Money");
    alienRole = serv.roles.find("name", "Alien");
    invisibleRole = serv.roles.find("name", "Invisible");
    setupMainRoleArray();

    setupSuggestionGalery();
    setupModdingGalery();
    setupArtGalery();

    mainRoleName = ["Werewolf","Soldier","Cop","SlaveMaster","Gangster Crepe","Gangster Blahd","Drug Dealer","Gorilla","Slum Dweller","Assassin","Bartender","Cannibal","Comedian","Doctor","Hacker","Investment Banker","Jock","Scientist","Shapeshifter","Shop Keeper","Thief","Vampire","Wrestler","Zombie"];
  
    console.log("########################################");
    console.log("################## Bot Ready babe !");
    
});

bot.login(process.env.BOT_TOKEN);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// MESSAGE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

bot.on('message', message => {
    //console.log(message);
    if(message.channel.type === "dm" && message.author !== bot.user){
        console.log("Dm");
        if(message.author !== botOwner){
            botOwner.send("📥" + message.author + " | `" + message.author.id + "` send me :\n" + message.content);
        }else if(message.content.startsWith("/say")){
            tab = message.content.split(" ");
            if(serv.members.find("id", tab[1])){
                serv.members.find("id", tab[1]).send(makeAstring(tab, 2, " "));
                botOwner.send("📤" + serv.members.find("id", tab[1]).user + " | `" +  tab[1] + "` I send him :\n" + makeAstring(tab, 2, " "));
                //message.delete();
            }else{
                message.author.send("Unknow player");
            }
        }
    }

    else if(message.content.startsWith(prefix, 0)){

        fonction(message, false);
        console.log(message.author.username + " a tapé " + message.content);
    }

    else if(message.content.startsWith("bot", 0)){

        fonction(message, true);
        console.log(message.author.username + " a tapé " + message.content);
    }

    else if(message.content.startsWith("ma bot", 0)){

        fonction(message, true);
        console.log(message.author.username + " a tapé " + message.content);
    }
    else if(message.content.startsWith("the bot", 0)){

        fonction(message, true);
        console.log(message.author.username + " a tapé " + message.content);
    }
    else if(message.content.startsWith("hey bot", 0)){

        fonction(message, true);
        console.log(message.author.username + " a tapé " + message.content);
    }


    /*
    else if((arg[0] === "r" || arg[0] === "are") && (arg[1] === "u" || arg[1] === "you") && (arg[2] === "ok" || arg[2] === "okay" || arg[2] === "k" || arg[2] === "kk" || arg[2] === "ok?" || arg[2] === "okay?" || arg[2] === "k?" || arg[2] === "kk?")){
        message.delete(3000);
        post("I'm okay 😃", "", here, 90);
    }*/
    
});

bot.on('messageReactionAdd', (messageReaction, user) => { 
    if(!user.bot && messageReaction.message.author.id === bot.user.id){
        if(messageReaction.message.embeds.length > 0 && messageReaction.message.embeds[0].title !== undefined){
            var chaine = messageReaction.message.embeds[0].title;

            console.log(user.username + " react " + messageReaction.emoji.name + " to " + chaine);
            if(messageReaction.message.embeds[0].title.startsWith("Suggestion n°", 0))
            {                    
                chaine = chaine.split(" ");
                chaine = chaine[1].split("°");
                var num = 0;
                num += chaine[1];
                num -= 1;

                if(messageReaction.emoji.name === "💚")
                {
                    var vote = 1;
                }
                
                else if(messageReaction.emoji.name === "❤")
                {
                    var vote = -1;
                }
                
                else if(messageReaction.emoji.name === "💛")
                {
                    var vote = 0;
                }
                
                else{
                    var vote = -9999;
                }

                //console.log("Going to vote " + vote + " for suggestion n°" + num);
                suggestionVote(user.id, num, vote);
                saveData();
            }else if(messageReaction.message.embeds[0].title.startsWith("Mod n°", 0))
            {                    
                chaine = chaine.split(" ");
                chaine = chaine[1].split("°");
                var num = 0;
                num += chaine[1];
                num -= 1;

                if(messageReaction.emoji.name === "💚")
                {
                    var vote = 1;
                }
                
                else if(messageReaction.emoji.name === "❤")
                {
                    var vote = -1;
                }
                
                else if(messageReaction.emoji.name === "💛")
                {
                    var vote = 0;
                }
                
                else{
                    var vote = -9999;
                }

                //console.log("Going to vote " + vote + " for mod n°" + num);
                moddingVote(user.id, num, vote);
                saveData();
            }else if(messageReaction.message.embeds[0].title.startsWith("Art n°", 0))
            {                    
                chaine = chaine.split(" ");
                chaine = chaine[1].split("°");
                var num = 0;
                num += chaine[1];
                num -= 1;

                if(messageReaction.emoji.name === "💚")
                {
                    var vote = 1;
                }
                
                else if(messageReaction.emoji.name === "❤")
                {
                    var vote = -1;
                }
                
                else if(messageReaction.emoji.name === "💛")
                {
                    var vote = 0;
                }
                
                else{
                    var vote = -9999;
                }

                //console.log("Going to vote " + vote + " for art n°" + num);
                artVote(user.id, num, vote);
                saveData();
            } 
            messageReaction.remove(user);
        
        }else{
            if(messageReaction.message.content.startsWith("Hola chico", 0) && messageReaction.emoji.name === "💵"){
                //console.log("Users = " + messageReaction.users);
                //console.log("First user = " + messageReaction.users.first());
                var member = serv.members.find("id", messageReaction.users.array()[1].id);
                if(member.roles.find("name","Thief")){
                    if( member.roles.find("name","Money")){
                        member.addRole(engagedMafiaRole);
                        member.removeRole(moneyRole);
                        post(getEmojie(getCharacterCode("Mobster")) + "\n" + "Welcome in your new family 😈 Bring us some sugar and you may become our brother",  member, blackMarket, 90);
                        messageReaction.message.delete();

                    }else{

                        post("Come back when you have some money to deal with 😠", member, offTopic, 5);
                        messageReaction.message.delete();

                    }
                }else{
                    post("I'm not talking to you chump 😒", member, offTopic, 5);
                    messageReaction.message.delete();
                }
            }
            console.log(user.username + " as réagis " + messageReaction.emoji + " à un de mes message");  
        }
    }
});

bot.on('guildMemberAdd', member => {
    member.user.send("Hey, welcome in the official **Streets of Rogue Server** ^^\nI'm the local bot who manage the server 😃");
    member.user.send("Rules in this server are likes almost all other server : \n 🖕 - No NSFV content / racism / SPAM or drama ... \n 🙃 - Keep your nickname clean \n 🇬🇧 - #general = english AND related to the game. If you want to speak about other stuff go #off-topic");
    member.user.send("🙌 If you need help ask " + botOwner + " (ping the developper only if necessary)\n\nAnd most important, have fun 😉 ...");
    member.user.send("By the way, have you already played **StreetsOfRogue** 🤔 ? If you want some info ask me `What is Streets Of Rogue ?` 🤗");
} )
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// SOUS - FONCTIONS //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function rand(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

async function post(string, replyTo, channel, nukeTime ){
    if(nukeTime === -1)
    {

        if(replyTo === ""){
            await channel.sendMessage(string);
        }else{
            await channel.sendMessage(replyTo + ", " + string);
        }
        //console.log("Message posted in " + channel + " to " + replyTo);

    }else{
       
        if(replyTo === ""){
            await channel.sendMessage(string).then(d_msg => { d_msg.delete(1000*nukeTime); });
        }else{
            await channel.sendMessage(replyTo + ", " + string).then(d_msg => { d_msg.delete(1000*nukeTime); });
        }
        //console.log("Message posted in " + channel + " to " + replyTo);

    }
}

function isAdmin(member){
    return (member.roles.find("name","mod") || member.roles.find("name","developer"));
}

function isSuggestionAdmin(member){
    return isAdmin(member) || member.roles.find("name","Suggestor");
}

function isModAdmin(member){
    return isAdmin(member) || member.roles.find("name","Modder");
}

function isArtAdmin(member){
    return isAdmin(member) || member.roles.find("name","Artist");
}

function isOffTopic(channel){
    return channel === offTopic;
}

function isSuggestion(channel){
    return channel === suggestion;
}

function duplicateString(string, number){
    var chaine = "";
    if(number > maxSpam){
        number = maxSpam;
    }

    for(var i = 0; i < number; i++){
        chaine = chaine + string
    }

    return chaine;
}

function makeAstring(tab, pos, sep){
    var string = "";

    for(var i = pos; i < tab.length; i++){
        string = string + sep + tab[i];
    }

    return string.slice(1);
}

function saveData(){
    var myData = JSON.stringify(data, null, 2);
    fs.writeFileSync('data.json', myData, savingDataFinished);
    loadData();

    function savingDataFinished(err){
        console.log('Saving data perfomed 😃');
    }
}

function loadData(){ 
    var myData = fs.readFileSync('data.json');
    data = JSON.parse(myData);
}

function rgbToHsv(rgb){
    var r = rgb[0]/255;
    var g = rgb[1]/255;
    var b = rgb[2]/255;

    var Cmin = min(r,g,b);
    var Cmax = max(r,g,b);

    var d = Cmax - Cmin;

    if(d = 0){
        var h = 0
    }else if(Cmax = r){
        var h = 60 * (((g-b)/d)%6);
    }else if(Cmax = g){
        var h = 60 * ((b-r)/d+2);
    }else{
        var h = 60 * ((r-g)/d+4);
    }

    if(Cmax = 0){
        var s = 0;
    }else{
        var s = d/Cmax;
    }

    var v = Cmax;

    return [h,s,v];
}

function hsvToRgb(hsv){
    var h = hsv[0];
    var s = hsv[1];
    var v = hsv[2];
    
    var c = v * s;
    
    var abs = (h / 60) % 2 - 1;
    if(abs < 0){
        abs *= -1;
    }

    var x = c * (1 - abs);
    var m = v - c;

    var rgb = [0,0,0];

    if( 0 <= h && h < 60 ){
        rgb = [c, x, 0];
    }else if( 60 <= h && h < 120 ){
        rgb = [x, c, 0];
    }else if( 120 <= h && h < 180 ){
        rgb = [0, c, x];
    }else if( 180 <= h && h < 240 ){
        rgb = [0, x, c];
    }else if( 240 <= h && h < 300 ){
        rgb = [x, 0, c];
    }else if( 300 <= h && h < 360 ){
        rgb = [c, 0, x];
    }

    var r = rgb[0];
    var g = rgb[1];
    var b = rgb[2];


    var trueRgb = [(r + m) * 255, (g + m) * 255, (b + m) * 255];

    //console.log("h = " + h + "\n s = " + s + "\n v = " + v + "\n c = " + c + "\n x = " + x + "\n m = " + m + "\nr = " + r + "\n g = " + g + "\n b = " + b);

    //console.log(hsv + " en hsv donne " + trueRgb + " en rgb ");
    return trueRgb;
}

function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// FONCTIONS EMOJIES /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function randPerso(){
    return bot.emojis.find("name", characters[  rand(0, characters.length) ]);
}

function randGangster(){
    return bot.emojis.find("name", gangster[  rand(0, gangster.length) ]);
}

function randMobster(){
    return bot.emojis.find("name", mobster[  rand(0, mobster.length) ]);
}

function randEntrance(charCode){
    return "";
}

function randMobsterFollower(){
    var otherFollower = rand(1, chanceMusicien + 1);
    if(otherFollower === 1){
        return bot.emojis.find("name", mobsterFollower[  rand(0, mobsterFollower.length) ]);
    }else{
        return randMobster();
    }
}

function randMobsterKongaLine(){
    return randMobsterFollower() + randMobster() + randMobster() + randMobster();
}

function randChenille(){
    
    var chenille = "";
    var nbPerso = rand(chenilleMin, chenilleMax);
    
    for(var i = 0; i < nbPerso;i++){
        chenille = chenille + " " + randPerso();
    }

    return chenille + ":musical_note:";
    
}

function spawnEmojies(charCode, nombre){
    var emote = getEmojie(charCode);
    return duplicateString(emote, nombre);
}

function hasRole(guildMember, string){
    
    return ( guildMember.roles.find("name",string) || guildMember.roles.find("id",string) );
}

async function removeMain(guildMember){
    
    await guildMember.removeRole("Money");
    console.log("Remove main to " + guildMember.user.username);
    for(var i = 0; i < mainRoleId.length; i++){
        await guildMember.removeRole(mainRoleId[i]);
    }
}

async function addMain(guildMember, id){

    
    await guildMember.addRole(mainRoleId[id]);

    console.log("Add main " + id + " to " + guildMember.user.username);
}

async function removeAndAddMain(guildMember, id){

    
    await guildMember.removeRole(moneyRole);
    await guildMember.removeRoles(mainRoleId);
    console.log("Remove main to " + guildMember.user.username); 

    await guildMember.addRole(mainRoleId[id]);
    console.log("Add main " + id + " to " + guildMember.user.username);

        
    if(mainRoleName[id] === "Upper Cruster" || mainRoleName[id] === "Investment Banker"){
        await guildMember.addRole(moneyRole);
    }

   
}

function setMain(guildMember, role){    
   
    var index = -1;
    if(role.startsWith("<:")){
        role = role.split(":")[1];
    }
    var test2 = role.toLocaleLowerCase().split(" ");
    var chaine2 = "";
    for(var j = 0; j < test2.length; j++){
        chaine2 += test2[j];
    }

    for(var i = 0; i < mainRoleName.length; i++){
        if(index === -1){
            var test = mainRoleName[i].toLocaleLowerCase().split(" ");
            var chaine = "";
            
            for(var j = 0; j < test.length; j++){
                chaine += test[j];
            }
            if(chaine === chaine2){
                index = i;
                i = mainRoleName.length;
            }
        }
    }


    

    console.log(guildMember.user.username + " want to add main : " + index);
    if(index !== -1){

        if(guildMember.roles.find("name", mainRoleName[index])){
            post("You already have this main 😉.", guildMember, offTopic, 10);
            return 10;
        }else{
            removeAndAddMain(guildMember, index);

            post("Main set with success 😃", guildMember, offTopic, 10);
            return 0;
        }       

    }else{
        post("Unknow main (or maybe it is a non-playable character, so you need to unlock it by other mean 🤔)", guildMember, offTopic, 60);
        return 60;
    }
}

function setupMainRoleArray(){

  //  console.log(mainRoleName);
  //  console.log(mainRoleId);

    //mainRoleId = mainRoleName;

    for(var j = 0; j < mainRoleName.length; j++){
    
        mainRoleId.push(serv.roles.find("name", mainRoleName[j]));
    //    console.log("mainRoleId["+j+"] = " + mainRoleId[j]);
        
    }

  //  console.log(mainRoleName);
  //  console.log(mainRoleId);
}

function getCharacterCode(character){
    var index = -1;

    if(character.startsWith("<:",0)){
        character = character.split(":")[1];
    }
    
    var character = character.toLocaleLowerCase().split(" ");
    var chaine = "";
    for(var j = 0; j < character.length; j++){
        chaine += character[j];
    }

    for(var i = 0; i < characters.length; i++){
        if(index === -1){
            var test2 = characters[i].toLocaleLowerCase().split(" ");
            var chaine2 = "";
            
            for(var j = 0; j < test2.length; j++){
                chaine2 += test2[j];
            }
            //console.log(chaine + " ?=? " + chaine2);
            if(chaine === chaine2){
                return i;
            }
        }
    }
    return -1;
}

function getEmojie(number){
    return bot.emojis.find("name", characters[number]); 
}

function getDayInYear(date){
    var month = date.getMonth();
    var day = date.getDate();
    var dayInYear = day;
    var monthLength = [31,28,31,30,31,30,31,31,30,31,30,31];

    for(var i = 0; i < month; i++ ){
        dayInYear += monthLength[i];
    }
    
    return dayInYear;
}

function getNextUpdootDay(){
    var updootDaySample = getDayInYear(new Date('May 17, 2018 00:00:00'));
    var today = getDayInYear(new Date());
    
    var timeLeft = (updootDaySample - (today));
    timeLeft = timeLeft%14;
    if(timeLeft < 0){
        timeLeft += 14;
    }

    if(timeLeft === 0){
        timeLeft = "TODAY 😄 !";
    }else if(timeLeft === 1){
        timeLeft = "tomorrow 😉";
    }else{
        timeLeft = "in " + timeLeft + " days";
    } 


    return "Updoot day is " + timeLeft;
}

function isSlave(id){
    for(var i = 0; i < data.aFranchArmy.length; i++){
        if (data.aFranchArmy[i] === id){
            return true;
        }
    }
    return false;
}

function showSlaves(){
    var chaine = getEmojie(getCharacterCode("slavemaster")) + " aFranchCoder";
    
    for(var i = 0; i < data.aFranchArmy.length; i++){
        chaine += "\n" + getEmojie(getCharacterCode("slave")) + " " + serv.members.find("id",data.aFranchArmy[i]).user.username;
    }

    post(chaine, "", offTopic, -1);
}

function joinSlaves(id){
    data.aFranchArmy.push(id);
    showSlaves();
    saveData();
}

function removeFrom(tab, element){
    for(var i = 0; i < tab.length; i++){
        if(tab[i] === element){
            tab.splice(i, 1);
        }
    }
    return tab;
}

function addTo(tab, element){
    for(var i = 0; i < tab.length; i++){
        if(tab[i] === element){
            return tab;
        }
    }
    tab.push(element);
    return tab;
}

function spawn(ammount, emojie, entranceSentence, member){
    if(isNaN(ammount)){
        if(isNaN(emojie)){
            post("Invalid argument, expecting a number", member, offTopic, 30);
            return 30;
        }else{
            var a = ammount
            ammount = emojie;
            emojie = a;
        }
    }

    var chaine = "";

    if(emojie.toLowerCase() === "mobsterkongaline" || emojie.toLowerCase() === "mobstercongaline" || emojie.toLowerCase() === "mafia"){
        chaine = randMobsterKongaLine();
        ammount = 1;

        if(member.roles.find("name","Thief") && !member.roles.find("name","Engaged in Mafia")){
            post(randMobsterKongaLine(), "", offTopic, 300);
            offTopic.send("Hola chico, du yu want to join our familly ? Gimme some 💵 and i'll let you enter in")
            .then(d_msg => {
                d_msg.delete(300 *1000);
                d_msg.react("💵");
            });
            return 1;
        }
    }else{
        index = getCharacterCode(emojie);
        if(index === -1){
            post("Unknown character. Please use :emojies: to be sure to have the correct spelling", member, offTopic, 30);
            return 30;
        }else{
            chaine = getEmojie(index);
        }    
    }

    entranceSentence = entranceSentence.slice(0, maxSpam - ammount);
    post(duplicateString(chaine, ammount) + " " + entranceSentence, "", offTopic, -1);
    return 1;
}

function randomEffect(){
    if(rand(0,100) === 0){
        return "became french";
    }
    return randEffect[rand(0, randEffect.length)];
}

function isUpdoot(id){
    for(var i = 0; i < data.updootList.length; i++){
        if(id === data.updootList[i]){
            return true;
        }
    }

    return false;
}

function isNotUpdoot(id){
    for(var i = 0; i < data.notUpdootList.length; i++){
        if(id === data.notUpdootList[i]){
            return true;
        }
    }

    return false;
}

function joinUpdoot(id){
    data.updootList = addTo(data.updootList, id);
    data.notUpdootList = removeFrom(data.notUpdootList, id);
    saveData();
}

function joinNotUpdoot(id){
    data.updootList = removeFrom(data.updootList, id);
    data.notUpdootList = addTo(data.notUpdootList, id);
    saveData();
}

function getUpdootNotif(txt){
    var chaine = "";
    for(var i = 0; i < data.updootList.length; i++){
        chaine += serv.members.find("id", data.updootList[i]);
    }
    chaine += "\n UPDOOT DAY !!!!!\n";
    chaine += txt;
    chaine += "\n";
    chaine += "Use `/updoot yes/no` if you want to be ping for next update or not."
    return chaine
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// SUGGESTION ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getSuggestionText(num, place){

    var green = data.suggestion[num][2].length;
    var red = data.suggestion[num][3].length;
    var likeAbs = 80 + 20 * green - 20 * red + rand(-1, 1) * 20;
    var builder = new Discord.RichEmbed()
    .setTitle("Suggestion n°" + (num+1) + " " + place + " by " + data.suggestion[num][0])
    .setColor(hsvToRgb([likeAbs%360,1,1]))
    .setDescription(data.suggestion[num][1])
    .addField("Like : ", getSuggestionLike(num));

    for(var i = 0; i < data.suggestion[num][4][0].length; i++){
        builder.addField("Comment by " + data.suggestion[num][4][0][i], data.suggestion[num][4][1][i]);
    }

    return builder;
}

function getSuggestionLike(num){
    
    var green = data.suggestion[num][2].length;
    var red = data.suggestion[num][3].length;

    if((green+red) === 0 ){
        var like = "*no like yet*";
    }else if (red === 0){
        var like = green + "💚";
    }else if (green === 0){
        var like = red + "❤";
    }else{
        var like = duplicateString("💚", green) + duplicateString("❤", red);
    }

    return like;
}

async function postSuggestion(num, place){
    var monMessage = getSuggestionText(num, place);

    if(!monMessage.description.startsWith("!//deleted//!", 0)){
        await suggestionGalery.sendEmbed(monMessage).then(d_msg => { 
            d_msg.react('💚');
            d_msg.react('💛')
            d_msg.react('❤');

            if(place === "🥇"){
                suggestionMessageTop[1-1] = d_msg;
            }else if (place === "🥈"){
                suggestionMessageTop[2-1] = d_msg;            
            }else if (place === "🥉"){
                suggestionMessageTop[3-1] = d_msg;   
                thirdSuggestionLike = data.suggestion[num][2].length - data.suggestion[num][3].length;         
            }else{
                while(suggestionMessage.length <= num){
                    suggestionMessage.push("");
                }
                suggestionMessage[num] = d_msg;
            }
        });
    }
}

async function suggestionVote(userId, num, vote){ 
    var liker = data.suggestion[num][2];
    var hater = data.suggestion[num][3];
    var wasAtTop = ((liker.length - hater.length) >= thirdSuggestionLike);

    if(vote === 1){
        hater = RemoveFrom(hater, userId);
        liker = AddTo(liker, userId);
    }else if(vote === -1){
        liker =  RemoveFrom(liker, userId);
        hater = AddTo(hater, userId);
    }else if(vote === 0){
        liker =  RemoveFrom(liker, userId);
        hater = RemoveFrom(hater, userId);
    }

    data.suggestion[num][2] = liker;
    data.suggestion[num][3] = hater;

    await updateSuggestion(num, "");
    if (wasAtTop || (liker.length - hater.length) >= thirdSuggestionLike){
        console.log("Gonna update Suggestion")
        await updateCoolestSuggestion();
    }
}

function postCoolestSuggestion(){
    var firstIndex = 0;
    var first = data.suggestion[0][2].length - data.suggestion[0][3].length;
    var secondIndex = 0;
    var second = first;
    var thirdIndex = 0;
    var third = first;
    //console.log("1 = " + firstIndex + "\n 2 = " + secondIndex + "\n 3 = " + thirdIndex);
    for(var i = 1; i < data.suggestion.length; i++){
        var score = data.suggestion[i][2].length - data.suggestion[i][3].length;
        if(score >= first){
            third = second;
            thirdIndex = secondIndex;
            second = first;
            secondIndex = firstIndex;
            first = score;
            firstIndex = i;
        }else if(score >= second){
            third = second;
            thirdIndex = secondIndex;
            second = score;
            secondIndex = i;
        }else if(score >= third){
            third = score;
            thirdIndex = i;
        }
    }

    //console.log("1 = " + firstIndex + "\n 2 = " + secondIndex + "\n 3 = " + thirdIndex);
    postSuggestion(firstIndex, "🥇");
    postSuggestion(secondIndex, "🥈");
    postSuggestion(thirdIndex, "🥉");
}

async function postSuggestionGalery(){
    try{
        await post(" ⬆ Here you can see **latest** suggestion\n============================================================================\n============================================================================\n============================================================================", "", suggestionGalery, -1);
        await postCoolestSuggestion();
        await post(" ⬆ Here you can see **coolest** suggestion\n============================================================================\n============================================================================\n============================================================================", "", suggestionGalery, -1);

        var instruction = new Discord.RichEmbed();
        instruction.setAuthor("aFranchCoder");
        instruction.setColor([255,0,0]);
        instruction.addField("🙀 What are suggestions ?", "Suggestions are ideas made by community for the game. It could either be proposition to improve the actual gameplay or new content. Remember: suggestions are suggestions so the developer may or may not consider adding them.");
        instruction.addField("🤔 How to post suggestions ?", "First talk about your ideas in #suggestion before composing your suggestion. Talk with other people to see if they like your idea or not and you could improve your suggestion with their tips. Once you have written a good suggestion with detail in important parts, you can suggest it via ```/suggest What about a dancing boombox ...```");
        instruction.addField("👍 How to vote ?","Well just click on 💚 to like, click on ❤ to dislike and click on 💛 to remove your vote  😉");
        instruction.addField("💬 What about comments ?","If you want to add a constructive comment such as more ideas or balance for the idea posted, you can comment a suggestion by typing ```"+prefix+"commentSuggestion 1 I like the idea but that would be better if...```**/!\\** Don't comment things like `\"I like it\"` or `\"Can you explain it more\"`. If you want to congratulate them or ask for details, please ask them in #suggestion-discussion or through DMs");
        await suggestionGalery.sendEmbed(instruction);
    }catch (e){
        console.error(e);
        post("Error during top suggestion setup : \n" + e, "", suggestionLog, -1);
    }
        
}

async function updateSuggestion(num, place){
    if(place === "🥇"){
        var message = suggestionMessageTop[0];
    }else if (place === "🥈"){
        var message = suggestionMessageTop[1];         
    }else if (place === "🥉"){
        var message = suggestionMessageTop[2];     
    }else{
        var message = suggestionMessage[num];
    }
    //console.log("Updating " + num + " " + place);
    var newEmbed = getSuggestionText(num, place);
    message.edit(newEmbed);
}

async function updateCoolestSuggestion(){

    //console.log("Updating Coolest Suggestion : start");
    var firstIndex = 0;
    var first = data.suggestion[0][2].length - data.suggestion[0][3].length;
    var secondIndex = 0;
    var second = first;
    var thirdIndex = 0;
    var third = first;

    //console.log("🥇 = " + firstIndex + "\n 🥈 = " + secondIndex + "\n 🥉 = " + thirdIndex);

    for(var i = 1; i < data.suggestion.length; i++){
        var score = data.suggestion[i][2].length - data.suggestion[i][3].length;
        if(score >= first){
            third = second;
            thirdIndex = secondIndex;
            second = first;
            secondIndex = firstIndex;
            first = score;
            firstIndex = i;
        }else if(score >= second){
            third = second;
            thirdIndex = secondIndex;
            second = score;
            secondIndex = i;
        }else if(score >= third){
            third = score;
            thirdIndex = i;
        }

    }

    //console.log("🥇 = " + firstIndex + "\n 🥈 = " + secondIndex + "\n 🥉 = " + thirdIndex);

    updateSuggestion(firstIndex, "🥇");
    updateSuggestion(secondIndex, "🥈");
    updateSuggestion(thirdIndex, "🥉");

    thirdSuggestionLike = third;
}

async function suggest(author, text){
    try {
        var allMessage = await suggestionGalery.fetchMessages({limit: 6});
        await suggestionGalery.bulkDelete(allMessage);

        //Suggestion === [author, text, [people who liked], [people who unliked], [[commentAuthor],[commentText]]]
        var nouvelleSuggestion = [author.username, text, [],[],  [[],[]], author.id];
        data.suggestion.push(nouvelleSuggestion);
        saveData();
        postSuggestion(data.suggestion.length - 1, "");
        postSuggestionGalery();

    } catch (e) {
        console.error(e);
        await suggestion.send("Error :(");
      //  await suggestionLog.send(author + " wanted to suggest :\n" + text + "\n\n**But something went wrong :**\n" + e);
    }
}

function comment(num, author, text){
    
    data.suggestion[num][4][0].push(author.username);
    data.suggestion[num][4][1].push(text);
    saveData();
    post("Comment posted", author, suggestion, 30);
    updateSuggestion(num, "");
    if((data.suggestion[num][2].length - data.suggestion[num][3].length) >= thirdSuggestionLike){
        updateCoolestSuggestion();
    }

}

async function setupSuggestionGalery(){
    
    suggestionGalery.overwritePermissions(serv.id, {
        VIEW_CHANNEL: false
      })

    try {
        
        allMessage = await suggestionGalery.fetchMessages({limit: (100)});
        await suggestionGalery.bulkDelete(allMessage);
        
        
    } catch (e) {
        console.error(e);
        suggestion.send("Error while seting up suggestions galery :(")
        suggestionLog.send("Bot wanted to setup suggestion galery\n\n**But something went wrong :**\n" + e);
    }

    for(var i = 0; i < data.suggestion.length; i++){
        postSuggestion(i, "");
    }

    await postSuggestionGalery();

    suggestionGalery.overwritePermissions(serv.id, {
        VIEW_CHANNEL: true
      })

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// MOD ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getModdingText(num, place){

    var green = data.modding[num][4].length;
    var red = data.modding[num][5].length;
    var likeAbs = 80 + 20 * green - 20 * red + rand(-1, 1) * 20;
    var builder = new Discord.RichEmbed()
    .setTitle("Mod n°" + (num+1) + " " + place + " by " + data.modding[num][0])
    .setColor(hsvToRgb([likeAbs%360,1,1]))
    .setDescription(data.modding[num][3])
    .setURL(data.modding[num][1])
    .setImage(data.modding[num][2])
    .addField("Like : ", getModdingLike(num));

    return builder;
}

function getModdingLike(num){
    
    var green = data.modding[num][4].length;
    var red = data.modding[num][5].length;

    if((green+red) === 0 ){
        var like = "*no like yet*";
    }else if (red === 0){
        var like = green + "💚";
    }else if (green === 0){
        var like = red + "❤";
    }else{
        var like = duplicateString("💚", green) + duplicateString("❤", red);
    }

    return like;
}

async function postModding(num, place){
    var monMessage = getModdingText(num, place);
    try{
        if(!monMessage.description.startsWith("!//deleted//!", 0)){
            await moddingGalery.sendEmbed(monMessage).then(d_msg => { 
                d_msg.react('💚');
                d_msg.react('💛')
                d_msg.react('❤');

                if(place === "🥇"){
                    moddingMessageTop[1-1] = d_msg;
                }else if (place === "🥈"){
                    moddingMessageTop[2-1] = d_msg;            
                }else if (place === "🥉"){
                    moddingMessageTop[3-1] = d_msg;   
                    thirdModdingLike = data.modding[num][4].length - data.modding[num][5].length;         
                }else{
                    while(moddingMessage.length <= num){
                        moddingMessage.push("");
                    }
                    moddingMessage[num] = d_msg;
                }
            });
        }
    }catch (e){
        
        if(e.code === 50035){
            await moddingLog.send("Bot wanted to send mod n°" + num + " " + place + " in Modding galery\n\n**But the link was wrong :**\n" + data.mod[num][1]);
            data.mod[num].push(data.mod[num][1]);
            data.mod[num][1] = "https://cdn.discordapp.com/attachments/453972058246873109/456534015256821780/URL_Error.png";
            saveData();
            serv.members.find("id", data.mod[num][5]).send("Hey bro :) ! It seems that your url is not valid for this mod : ");
            serv.members.find("id", data.mod[num][5]).send(getModdingText(num, ""));
            serv.members.find("id", data.mod[num][5]).send("You typed : " + data.mod[num][6] + "\n But this url doesn't correspond to an image. Remember that only .PNG .JPEG or .GIF can be displayed. If you want to share a video, please put the link in the description ;)\n If you want to change that image please ask " + botOwner + "");
 
            postModding(num, place);
        }else{
            console.error(e);
            await moddingGalery.send("Bot wanted to send mod n°" + num + " " + place + " in mod galery\n\n**But something went wrong :**\n" + e);
        }
    }
}

async function moddingVote(userId, num, vote){ 
    var liker = data.modding[num][4];
    var hater = data.modding[num][5];

    var wasAtTop = ((liker.length - hater.length) >= thirdModdingLike);

    if(vote === 1){
        hater = RemoveFrom(hater, userId);
        liker = AddTo(liker, userId);
    }else if(vote === -1){
        liker =  RemoveFrom(liker, userId);
        hater = AddTo(hater, userId);
    }else if(vote === 0){
        liker =  RemoveFrom(liker, userId);
        hater = RemoveFrom(hater, userId);
    }

    data.modding[num][4] = liker;
    data.modding[num][5] = hater;

    //console.log("Vote done. Gonna update the embed");
    await updateModding(num, "");
    //console.log("Current like : " + (liker.length - hater.length) + " VS n°3 = " + thirdModdingLike);
    if (wasAtTop || (liker.length - hater.length) >= thirdModdingLike){
        //console.log("Gonna update Modding Toplist");
        await updateCoolestModding();
    }
}

function postCoolestModding(){
    
    //console.log("Posting Coolest Modding : start");
    var firstIndex = 0;
    var first = data.modding[0][4].length - data.modding[0][5].length;
    var secondIndex = 0;
    var second = first;
    var thirdIndex = 0;
    var third = first;

    //console.log("FirstIndex = " + firstIndex + "\n SecondIndex = " + secondIndex + "\n ThirdIndex = " + thirdIndex);
    //console.log("First = " + first + "\n Second = " + second + "\n Third = " + third);

    for(var i = 1; i < data.modding.length; i++){
        var score = data.modding[i][4].length - data.modding[i][5].length;
        if(score >= first){
            third = second;
            thirdIndex = secondIndex;
            second = first;
            secondIndex = firstIndex;
            first = score;
            firstIndex = i;
        }else if(score >= second){
            third = second;
            thirdIndex = secondIndex;
            second = score;
            secondIndex = i;
        }else if(score >= third){
            third = score;
            thirdIndex = i;
        }

    }

    //console.log("FirstIndex = " + firstIndex + "\n SecondIndex = " + secondIndex + "\n ThirdIndex = " + thirdIndex);
    //console.log("First = " + first + "\n Second = " + second + "\n Third = " + third);
    
    postModding(firstIndex, "🥇");
    postModding(secondIndex, "🥈");
    postModding(thirdIndex, "🥉");

    thirdModdingLike = third;
    //console.log("ThirdModdingLike = " + thirdModdingLike);
}

async function postModdingGalery(){
    try{
        await post(" ⬆ Here you can see **latest** mods\n============================================================================\n============================================================================\n============================================================================", "", moddingGalery, -1);
        await postCoolestModding();
        await post(" ⬆ Here you can see **coolest** mods\n============================================================================\n============================================================================\n============================================================================", "", moddingGalery, -1);
    
        var instruction = new Discord.RichEmbed();
        instruction.setAuthor("aFranchCoder");
        instruction.setColor([255,0,0]);
        instruction.addField("😱 What are Mods ?", "Mods are some kind of DLCs made by player in order to add new stuff in the game ( a new character, a new items).");
        instruction.addField("🔧 How to make mod ?", "Official Mod Support will only be available once game hits release. Until that you can still make mod : download ILSpy or dnSpy and edit the gamefiles in CIL (Assembly). Once you created a mod you can post it here so other player can play with it 😃  ```/postMod [link where to download the mod] [url of an image to introduce your mod] Hey i moded a dancing boombox ...```");
        instruction.addField("👍 How to vote ?","Well just click on 💚 to like, click on ❤ to dislike and click on 💛 to remove your vote  😉");
        await moddingGalery.sendEmbed(instruction);
    

    }catch(e){
        console.error(e);
        post("Error during top mod galery setup : \n" + e, "", moddingLog, -1);
    }

}

async function updateModding(num, place){
    if(place === "🥇"){
        var message = moddingMessageTop[0];
    }else if (place === "🥈"){
        var message = moddingMessageTop[1];         
    }else if (place === "🥉"){
        var message = moddingMessageTop[2];     
    }else{
        var message = moddingMessage[num];
    }
    //console.log("Updating " + num + " " + place + "...");
    var newEmbed = getModdingText(num, place);
    message.edit(newEmbed);
    //console.log("Updated " + num + " " + place);
}

async function updateCoolestModding(){

    //console.log("Updating Coolest Modding : start");
    var firstIndex = 0;
    var first = data.modding[0][4].length - data.modding[0][5].length;
    var secondIndex = 0;
    var second = first;
    var thirdIndex = 0;
    var third = first;

    //console.log("FirstIndex = " + firstIndex + "\n SecondIndex = " + secondIndex + "\n ThirdIndex = " + thirdIndex);
    //console.log("First = " + first + "\n Second = " + second + "\n Third = " + third);

    for(var i = 1; i < data.modding.length; i++){
        var score = data.modding[i][4].length - data.modding[i][5].length;
        if(score >= first){
            third = second;
            thirdIndex = secondIndex;
            second = first;
            secondIndex = firstIndex;
            first = score;
            firstIndex = i;
        }else if(score >= second){
            third = second;
            thirdIndex = secondIndex;
            second = score;
            secondIndex = i;
        }else if(score >= third){
            third = score;
            thirdIndex = i;
        }

    }

    //console.log("FirstIndex = " + firstIndex + "\n SecondIndex = " + secondIndex + "\n ThirdIndex = " + thirdIndex);
    //console.log("First = " + first + "\n Second = " + second + "\n Third = " + third);

    updateModding(firstIndex, "🥇");
    updateModding(secondIndex, "🥈");
    updateModding(thirdIndex, "🥉");

    thirdModdingLike = third;
}

async function suggestMod(author, url, imageUrl, text){
    try {
        var allMessage = await moddingGalery.fetchMessages({limit: 6});
        await moddingGalery.bulkDelete(allMessage);

        //Modding === [author, url, image url, text, [people who liked], [people who unliked], id]
        var nouvelleModding = [author.username, url, imageUrl, text, [],[], author.id];
        data.modding.push(nouvelleModding);
        saveData();
        postModding(data.modding.length - 1, "");
        postModdingGalery();

    } catch (e) {
        console.error(e);
        await modding.send("Error :(");
        await moddingLog.send(author + " wanted to suggest :\n" + url + " : " + text + " with this image : \n " + imageUrl + "\n\n**But something went wrong :**\n" + e);
    }
}

async function setupModdingGalery(){

    try {
        
        allMessage = await moddingGalery.fetchMessages({limit: (100)});
        await moddingGalery.bulkDelete(allMessage);
    } catch (e) {
        console.error(e);
        await Modding.send("Error while seting up Moddings galery :(")
        await ModdingLog.send("Bot wanted to setup Modding galery\n\n**But something went wrong :**\n" + e);
    }
       
    moddingGalery.overwritePermissions(serv.id, {
        VIEW_CHANNEL: false
      })

    for(var i = 0; i < data.modding.length; i++){
        postModding(i, "");
    }

    await postModdingGalery();

    
    moddingGalery.overwritePermissions(serv.id, {
        VIEW_CHANNEL: true
      })

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// ART ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getArtText(num, place){

    var green = data.art[num][3].length;
    var red = data.art[num][4].length;
    var likeAbs = 80 + 20 * green - 20 * red + rand(-1, 1) * 20;
    var builder = new Discord.RichEmbed()
    .setTitle("Art n°" + (num+1) + " " + place + " by " + data.art[num][0])
    .setColor(hsvToRgb([likeAbs%360,1,1]))
    .setDescription(data.art[num][2])
    .setImage(data.art[num][1])
    .addField("Like : ", getArtLike(num));

    return builder;
}

function getArtLike(num){
    
    var green = data.art[num][3].length;
    var red = data.art[num][4].length;

    if((green+red) === 0 ){
        var like = "*no like yet*";
    }else if (red === 0){
        var like = green + "💚";
    }else if (green === 0){
        var like = red + "❤";
    }else{
        var like = duplicateString("💚", green) + duplicateString("❤", red);
    }

    return like;
}

async function postArt(num, place){
    try{
        
        var monMessage = getArtText(num, place);
    
        if(!monMessage.description.startsWith("!//deleted//!", 0)){
            await artGalery.sendEmbed(monMessage).then(d_msg => { 
                d_msg.react('💚');
                d_msg.react('💛')
                d_msg.react('❤');
    
                if(place === "🥇"){
                    artMessageTop[1-1] = d_msg;
                }else if (place === "🥈"){
                    artMessageTop[2-1] = d_msg;            
                }else if (place === "🥉"){
                    artMessageTop[3-1] = d_msg;   
                    thirdArtLike = data.art[num][3].length - data.art[num][4].length;         
                }else{
                    while(artMessage.length <= num){
                        artMessage.push("");
                    }
                    artMessage[num] = d_msg;
                }
            });
        }

    }
    catch (e) {
        if(e.code === 50035){
            artLog.send("Bot wanted to send art n°" + num + " " + place + " in Art galery\n\n**But the link was wrong :**\n" + data.art[num][1]);
            data.art[num].push(data.art[num][1]);
            data.art[num][1] = "https://cdn.discordapp.com/attachments/453972058246873109/456534015256821780/URL_Error.png";
            saveData();
            serv.members.find("id", data.art[num][5]).send("Hey bro :) ! It seems that your url is not valid for this art : ");
            serv.members.find("id", data.art[num][5]).send(getArtText(num, ""));
            serv.members.find("id", data.art[num][5]).send("You typed : " + data.art[num][6] + "\n But this url doesn't correspond to an image. Remember that only .PNG .JPEG or .GIF can be displayed. If you want to share a video, please put the link in the description ;)\n If you want to change that image please ask " + botOwner + "");
            postArt(num, place);
            
        }else{
            console.error(e);
            await artLog.send("Bot wanted to send art n°" + num + " " + place + " in Art galery\n\n**But something went wrong :**\n" + e);
        }
        
    }
}

async function artVote(userId, num, vote){ 
    //console.log("ThirdArtLike = " + thirdArtLike);
    var liker = data.art[num][3];
    var hater = data.art[num][4];

    var wasAtTop = ((liker.length - hater.length) >= thirdArtLike);

    if(vote === 1){
        hater = RemoveFrom(hater, userId);
        liker = AddTo(liker, userId);
    }else if(vote === -1){
        liker =  RemoveFrom(liker, userId);
        hater = AddTo(hater, userId);
    }else if(vote === 0){
        liker =  RemoveFrom(liker, userId);
        hater = RemoveFrom(hater, userId);
    }

    data.art[num][3] = liker;
    data.art[num][4] = hater;

    //console.log("Vote done. Gonna update the embed");
    await updateArt(num, "");
    //console.log("Current like : " + (liker.length - hater.length) + " VS n°3 = " + thirdArtLike);
    if (wasAtTop || (liker.length - hater.length) >= thirdArtLike){
        //console.log("Gonna update Art Toplist");
        await updateCoolestArt();
    }
}

function postCoolestArt(){
    
    //console.log("Posting Coolest Art : start");
    var firstIndex = 0;
    var first = data.art[0][3].length - data.art[0][4].length;
    var secondIndex = 0;
    var second = first;
    var thirdIndex = 0;
    var third = first;

    //console.log("FirstIndex = " + firstIndex + "\n SecondIndex = " + secondIndex + "\n ThirdIndex = " + thirdIndex);
    //console.log("First = " + first + "\n Second = " + second + "\n Third = " + third);

    for(var i = 1; i < data.art.length; i++){
        var score = data.art[i][3].length - data.art[i][4].length;
        if(score >= first){
            third = second;
            thirdIndex = secondIndex;
            second = first;
            secondIndex = firstIndex;
            first = score;
            firstIndex = i;
        }else if(score >= second){
            third = second;
            thirdIndex = secondIndex;
            second = score;
            secondIndex = i;
        }else if(score >= third){
            third = score;
            thirdIndex = i;
        }

    }

    //console.log("FirstIndex = " + firstIndex + "\n SecondIndex = " + secondIndex + "\n ThirdIndex = " + thirdIndex);
    //console.log("First = " + first + "\n Second = " + second + "\n Third = " + third);
    
    postArt(firstIndex, "🥇");
    postArt(secondIndex, "🥈");
    postArt(thirdIndex, "🥉");

    thirdArtLike = third;
    //console.log("ThirdArtLike = " + thirdArtLike);
}

async function postArtGalery(){
    try{
        await post(" ⬆ Here you can see **latest** arts\n============================================================================\n============================================================================\n============================================================================", "", artGalery, -1);
        await postCoolestArt();
        await post(" ⬆ Here you can see **coolest** arts\n============================================================================\n============================================================================\n============================================================================", "", artGalery, -1);
    
        var instruction = new Discord.RichEmbed();
        instruction.setAuthor("aFranchCoder");
        instruction.setColor([255,0,0]);
        instruction.addField("👾 Arts ?", "Here you can post drawing/animation/painting/memes/video as long as it is related to **Streets of Rogue**");
        instruction.addField("🔧 Need help for art ?", "You can ask @artist or anybody in #art if you struggle with you work. Then, whenever you work is done, post it via ```/postArt [link] Hey i made a GIF of a dancing boombox ...``` (if you want you can post your image/gif in 💬art👾 and copy link in order to get a permanent link 😉 )");
        instruction.addField("👍 How to vote ?","Well just click on 💚 to like, click on ❤ to dislike and click on 💛 to remove your vote  😉");
        await artGalery.sendEmbed(instruction);
    

    }catch (e){
        console.error(e);
        post("Something went wrong during top art setup : \n " + e, "", artLog, -1);
    }

}

async function updateArt(num, place){
    if(place === "🥇"){
        var message = artMessageTop[0];
    }else if (place === "🥈"){
        var message = artMessageTop[1];         
    }else if (place === "🥉"){
        var message = artMessageTop[2];     
    }else{
        var message = artMessage[num];
    }
    //console.log("Updating " + num + " " + place + "...");
    var newEmbed = getArtText(num, place);
    message.edit(newEmbed);
    //console.log("Updated " + num + " " + place);
}

async function updateCoolestArt(){

    //console.log("Updating Coolest Art : start");
    var firstIndex = 0;
    var first = data.art[0][3].length - data.art[0][4].length;
    var secondIndex = 0;
    var second = first;
    var thirdIndex = 0;
    var third = first;

    //console.log("FirstIndex = " + firstIndex + "\n SecondIndex = " + secondIndex + "\n ThirdIndex = " + thirdIndex);
    //console.log("First = " + first + "\n Second = " + second + "\n Third = " + third);

    for(var i = 1; i < data.art.length; i++){
        var score = data.art[i][3].length - data.art[i][4].length;
        if(score >= first){
            third = second;
            thirdIndex = secondIndex;
            second = first;
            secondIndex = firstIndex;
            first = score;
            firstIndex = i;
        }else if(score >= second){
            third = second;
            thirdIndex = secondIndex;
            second = score;
            secondIndex = i;
        }else if(score >= third){
            third = score;
            thirdIndex = i;
        }

    }

    //console.log("FirstIndex = " + firstIndex + "\n SecondIndex = " + secondIndex + "\n ThirdIndex = " + thirdIndex);
    //console.log("First = " + first + "\n Second = " + second + "\n Third = " + third);

    updateArt(firstIndex, "🥇");
    updateArt(secondIndex, "🥈");
    updateArt(thirdIndex, "🥉");

    thirdArtLike = third;
}

async function suggestArt(author, imageUrl, text){
    try {
        var allMessage = await artGalery.fetchMessages({limit: 6});
        await artGalery.bulkDelete(allMessage);

        //Art === [author, image url, text, [people who liked], [people who unliked], id]
        var nouvelleArt = [author.username, imageUrl, text, [],[], author.id];
        data.art.push(nouvelleArt);
        saveData();
        postArt(data.art.length - 1, "");
        postArtGalery();

    } catch (e) {
        console.error(e);
        await art.send("Error :(");
        await artLog.send(author + " wanted to post :\n" + imageUrl + "\n" + text + "\n\n**But something went wrong :**\n" + e);
    }
}

async function setupArtGalery(){


    try {
        
        allMessage = await artGalery.fetchMessages({limit: (100)});
        await artGalery.bulkDelete(allMessage);


    } catch (e) {
        console.error(e);
        await art.send("Error while seting up Arts galery :(")
        await artLog.send("Bot wanted to setup Art galery\n\n**But something went wrong :**\n" + e);
    }

    
    artGalery.overwritePermissions(serv.id, {
        VIEW_CHANNEL: false
      })

    for(var i = 0; i < data.art.length; i++){
        await postArt(i, "");
    }

    await postArtGalery();
    
    artGalery.overwritePermissions(serv.id, {
        VIEW_CHANNEL: true
      })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// FONCTION //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function fonction(message, justAreYouOkay){
    
    var tab = message.content.substring(prefix.length, message.content.length).split(" ");
    var arg = message.content.substring(prefix.length, message.content.length).toLowerCase().split(" ");
    var repondre = message.author;
    var here = message.channel;

    if(isOffTopic(message.channel)){
        var repondreSiBesoin = "";
    }else{
        var repondreSiBesoin = message.author;
    }
    
    if(isSuggestion(message.channel)){
        var repondreSiBesoin2 = "";
    }else{
        var repondreSiBesoin2 = message.author;
    }
    
    if(justAreYouOkay){
            
        if((arg[0] === "r" || arg[0] === "are") && (arg[1] === "u" || arg[1] === "you") && (arg[2] === "ok" || arg[2] === "okay" || arg[2] === "k" || arg[2] === "kk" || arg[2] === "ok?" || arg[2] === "okay?" || arg[2] === "k?" || arg[2] === "kk?")){
            message.delete(3000);
            post("I'm okay 😃", "", here, 90);
        }else if((arg[1] === "r" || arg[1] === "are") && (arg[2] === "u" || arg[2] === "you") && (arg[3] === "ok" || arg[3] === "okay" || arg[3] === "k" || arg[3] === "kk" || arg[3] === "ok?" || arg[3] === "okay?" || arg[3] === "k?" || arg[3] === "kk?")){
            message.delete(3000);
            post("I'm okay 😃", "", here, 90);
        }else if((arg[2] === "r" || arg[2] === "are") && (arg[3] === "u" || arg[3] === "you") && (arg[4] === "ok" || arg[4] === "okay" || arg[4] === "k" || arg[4] === "kk" || arg[4] === "ok?" || arg[4] === "okay?" || arg[4] === "k?" || arg[4] === "kk?")){
            message.delete(3000);
            post("I'm okay 😃", "", here, 90);
        }
        return 1;

    }



    if(arg[0] === "help"){
        if(here === suggestion){
            post("/help is under construction for suggestion atm. Please type it somewhere else", repondre, here, 30);
        }else if(here === offTopic){
            
	
            var embed = new Discord.RichEmbed()
            .setTitle("/help")
            .setAuthor("aFranchCoder")
            .addField("/konga Line" + getEmojie(getCharacterCode("Musician"))+getEmojie(getCharacterCode("Comedian"))+getEmojie(getCharacterCode("Bartender"))+getEmojie(getCharacterCode("Doctor")),"```/kongaLine``` KONGA 🎵")
            
            .addField("/spawn","```/spawn [emojie] [number and or entrance sentence]```Spawn emojies " + getEmojie(getCharacterCode("Soldier")))
            
            .addField("/hold Up","```/hold Up``` Call mafia")
            
            .addField("/aFranchArmy","```/aFranchArmy [join/show/leave]``` Join *les braves* 👌")
            
            .addField("/main","```/main set [Character]``` or ```/main remove```Give you a role to show what is our favorite character 😉")
            
            .addField("/updootday","```/updootday```See when update is coming out 🙀")
            
            .addField("/help","```/help```Ask help " + getEmojie(getCharacterCode("ButlerBot")) + " (type /help on #suggestion or somewhere else to see extra function)");
            here.sendEmbed(embed).then(d_msg => { d_msg.delete(1000*60); });
            message.delete(3000);
            
        }else{
            var embed = new Discord.RichEmbed()
            .setTitle("/help")
            .setAuthor("aFranchCoder")
            .addField("/main","```/main set [Character]``` or ```/main remove```Give you a role to show what is our favorite character 😉")
            
            .addField("/help","```/help```Ask help " + getEmojie(getCharacterCode("ButlerBot")) + " (type /help on #suggestion and #off-topic to see extra function)");
    
            here.sendEmbed(embed).then(d_msg => { d_msg.delete(1000*60); });
            message.delete(3000);

        }
    }    
    /*
    else if(arg[0] === "setofftopic"){

        if(!isAdmin(message.author)){
            post("You are not allowed to do that", repondre, here, 10);
            return "";
        }

        offTopic = message.channel;
        post("This channel has been set has offTopic", "", here, 10);
        
        message.delete();
    }
    
    else if(arg[0] === "setsuggestion"){
        
        if(!isAdmin(message.author)){
            post("You are not allowed to do that", repondre, here, 10);
            return "";
        }

        suggestion = message.channel;
        post("This channel has been set has suggestion", "", here, 10);
        
        message.delete();
    }
    */
    else if(arg[0] === "afrancharmy" || arg[0] === "francharmy"){
        if(arg[1] === "join"){
            if(isSlave(message.author.id)){
                post("aFranchCoder already owns you", repondreSiBesoin, offTopic, 30);
            }else{
                post("You successfully joined aFranchCoder's army", repondreSiBesoin, offTopic, 60);
                joinSlaves(message.author.id);
            }
        }else if(arg[1] === "leave"){
            if(isSlave(message.author)){
                post("If you want to leave aFranchCoder's you need either his authorisation or these things : \n - Your name \n - Your discord ID \n - A resignation letter \n - Identity card \n - The finger print of your big toe \n - URSS's Nuclear Code", repondre, offTopic, 60);
            }else{
                post("You never join aFranchCoder's army yet. Type that to join us : ```/aFranchArmy join```", repondreSiBesoin, offTopic, 30);
            }
        }else if(arg[1] === "show"){
            showSlaves();
        }else{
            post("Join us : ```/aFranchArmy join/show```", repondreSiBesoin, offTopic, 30);
        }

        message.delete(10000);
    }

    else if((arg[0] === "kongaline" || ( arg[0] === "konga" && arg[1] === "line")) || (arg[0] === "congaline" || ( arg[0] === "conga" && arg[1] === "line") )){
        post(randChenille(), repondreSiBesoin , offTopic, -1);
        message.delete();
    }

    else if(arg[0] === "boombox"){
        post("🎵 " + randPerso() + randPerso() + randPerso() + randPerso() + bot.emojis.find("name", "Boombox") + randPerso() + randPerso() + randPerso() + randPerso() + " 🎵", repondreSiBesoin , offTopic, -1);
        
        message.delete();
    }

    else if(arg[0] === "updoot" || arg[0] === "updootday" || ( arg[0] === "updoot" && arg[1] === "day")){
        if(arg[1] === "yes" || arg[2]  === "yes"){
            joinUpdoot(message.author.id);
        }else if(arg[1] === "no" || arg[2]  === "no"){
            joinNotUpdoot(message.author.id);    
        }else if(arg[1] === "post" && isAdmin(message.member)){
            post( getUpdootNotif(makeAstring(tab, 2, " ")), "", here, -1);
        }else{
            await post(getNextUpdootDay(), repondreSiBesoin , offTopic, -1);
            if(!isUpdoot(message.author.id) && !isNotUpdoot(message.author.id)){
                post("Hey ! I can registrer you on the `Updoot Day list` so i may ping you whenever new update is out.\nType `" + prefix + "updootDay yes` to accept (or `no` to refuse)", repondre, here, 360);
            }
        }
        
        message.delete();
    }

    else if(arg[0] === "holdup" || (arg[0] === "hold" && arg[1] === "up")){
        
        if(message.member.roles.find("name","Mobster")){
        
            var lesMessages = offTopic.messages.array();
            var longueur =  lesMessages.length;
            var trouve = false;
            if(longueur > 10){
                longueur = 10;
            }
            for(var i = 0; i < longueur ; i++){
                if(!trouve && !lesMessages[i].author.bot && !(lesMessages[i].member.roles.find("name","Mobster"))){
                    post(randMobsterKongaLine() + getEmojie(getCharacterCode("Mobster")), "", offTopic, -1);
                    post("Hand over you cash, if you please ! - *" + message.author.username + "*", lesMessages[i].author , offTopic, -1);
                    trouve = true;
                }
            }

            if(!trouve){
                
                post(randMobsterKongaLine() + getEmojie(getCharacterCode("Mobster")), "", offTopic, -1);
                post("Hand over you cash, if you please ! - *" + message.author.username + "*", "" , offTopic, -1);
            }

        }else{

            post(randMobsterKongaLine(), "", offTopic, -1);
            post("Hand over you cash, if you please ! You thought you could give us order !", repondre , offTopic, -1);

        }

        
        message.delete();
    }

    else if(arg[0] === "main"){
        
        if(arg.length < 1){
          //  post("@" + message.author.username + " 's main is : " + getMain(message.member), "", here, 30);
                post("Error invalid argument : ```/main set :emoji:```or```/main remove```", repondre, offTopic, 30);
        }else{
            if(arg[1] === "remove"){
                message.delete(3000);
                message.member.removeRoles(mainRoleId);
                post("Removed your main", repondre, offTopic, 30);
            }else if(arg[1] === "set"){
                var role = makeAstring(arg, 2, " ");
                message.delete(setMain(message.member, role));
            }else {
                var role = makeAstring(arg, 1, " ");
                message.delete(setMain(message.member, role));
            }
        }

    }

    else if(arg[0] === "spawn" || arg[0] === "" || arg[0].startsWith("<:")){
        var start = 0;
        if(arg[0] == "spawn"){
            start = 1;
        }

        var newArg = [];

        for(start; start < arg.length; start++ ){
            if(tab[start] !== ""){
                newArg.push(tab[start]);
            }
        }

        if(newArg.length < 1){
            post("Expecting at least [emojie] for /spawn", repondre, offTopic, 30);
            message.delete(1000 * 30);
        }else if(newArg.length < 2){
            message.delete(1000 * spawn(1, newArg[0], "", message.member));
        }else{
            message.delete(1000 * spawn(newArg[0], newArg[1],  makeAstring(newArg, 2, " "), message.member));
        }
    }
    


    else if(arg[0] === "suggest"){
        if(Date.now() < nextSuggestionTime){
            post("Please wait 10sec between each suggestion", repondre, suggestion, 10);
            message.delete(60000);
        }else if(arg.length < 2){

            post("Uncorrect argument. Please type ```"+prefix+"suggest [text]```", repondre, suggestion, 30);
            message.delete(30000);

        }else{
            if(arg.length < 10){
                post("Suggestions need to contain at least 10 words", repondre, suggestion, 30);
                message.delete(30000);                
            }else{
                var text =  makeAstring(tab, 1, " ");
                suggest(message.author, text);
                nextSuggestionTime = Date.now() + 10000;
                message.delete();
                //post("Suggestion posted in #suggestions", repondre, suggestion, 10);
            }
        }
    }

    else if(arg[0] === "commentsuggestion"){

        if(Date.now() < nextSuggestionTime){
            post("Please wait 10sec between each suggestion/comment", repondre, suggestion, 10);
            message.delete(60000);
        }else if(tab.length < 3){
            post("Uncorrect argument. Please type ```"+prefix+"commentSuggestion [number] [text]```", repondre, suggestion, 30);
            message.delete(30000);
        }

        else if(isNaN(tab[1]) || Number(tab[1]) < 1 || Number(tab[1]) > data.suggestion.length){
            post("Uncorrect argument. Please type ```"+prefix+"commentSuggestion [suggestion number between 1 and " + data.suggestion.length + "] [text] ``` ", repondre, suggestion, 30);
            message.delete(30000);
        }

        else if(tab.length < 12){
            post("Comment needs to contain at least 10 words. Comment only to add more details/ideas (don't comment things like \"I like it \", use vote instead", repondre, suggestion, 30);
            message.delete(30000); 
        }

        else{
            var text =  makeAstring(tab, 2, " ");
            comment(Number(tab[1]) - 1, message.author, text);
            nextSuggestionTime = Date.now() + 10000;
            message.delete();
        }
    }

    else if((arg[0] === "comment" && arg[1] === "suggestion") || (arg[0] === "suggestion" && arg[1] === "comment")){
        
        if(tab.length < 4){
            post("Uncorrect argument. Please type ```"+prefix+"comment suggestion [number] [text]```", repondre, suggestion, 30);
            message.delete(30000);
        }

        else if(isNaN(tab[2]) || Number(tab[2]) < 1 || Number(tab[2]) > data.suggestion.length){
            post("Uncorrect argument. Please type ```"+prefix+"comment suggestion [suggestion number between 1 and " + data.suggestion.length + "] [text] ``` ", repondre, suggestion, 30);
            message.delete(30000);
        }

        else if(tab.length < 13){
            post("Comment needs to contain at least 10 words. Comment only to add more details/ideas (don't comment things like \"I like it \", use vote instead", repondre, suggestion, 30);
            message.delete(30000); 
        }

        else{
            var text =  makeAstring(tab, 3, " ");
            comment(Number(tab[2]) - 1, message.author, text);
            message.delete();
        }
    }

    else if((arg[0] === "delete" && arg[1] === "suggestion") || (arg[0] === "suggestion" && arg[1] === "delete")){
        if(!isSuggestionAdmin(message.member)){
            post("You are not allow to use this command :/ Only Suggestor or admin can.", repondre, suggestion, 10);
            message.delete(10000)
        }
        
        else if(tab.length < 4){
            post("Uncorrect argument. Please type ```"+prefix+"delete suggestion [number] [reason]```", repondre, suggestion, 30);
            message.delete(30000);
        }

        else if(isNaN(tab[2]) || Number(tab[2]) < 1 || Number(tab[2]) > data.suggestion.length){
            post("Uncorrect argument. Please type ```"+prefix+"delete suggestion [suggestion number between 1 and " + data.suggestion.length + "] [reason] ``` ", repondre, suggestion, 30);
            message.delete(30000);
        }

        else{
            var num = Number(tab[2]) - 1;
            var author = serv.members.find("id", data.suggestion[num][5]);
            author.sendMessage(message.author + " deleted your suggestion because : " + makeAstring(tab, 3, " "));
            author.sendMessage(getSuggestionText(num, ""));
            author.sendMessage("If you think this is an abuse, please send a DM to " + botOwner + "");

            post(message.author + " deleted this suggestion :", "", suggestionLog, -1);
            post(getSuggestionText(num, ""), "", suggestionLog, -1);
            post("Because of " + makeAstring(tab, 3, " "), "", suggestionLog, -1);

            data.suggestion[num][1] = "!//deleted//!" + data.suggestion[num][1];
            saveData();
            message.delete();
            if(suggestionMessage[num] !== ""){
                suggestionMessage[num].delete();
            }

        }
    }

    else if((arg[0] === "rebuild" && arg[1] === "suggestion") || (arg[0] === "suggestion" && arg[1] === "rebuild")){
        setupSuggestionGalery();
    }



    

    else if(arg[0] === "suggestmod"){
        
        if(Date.now() < nextModTime){
            post("Please wait 10sec between each mod", repondre, modding, 10);
            message.delete(60000);
        }else if(arg.length < 4){

            post("Uncorrect argument. Please type ```"+prefix+"suggest [url Files] [url Image] [desription]```", repondre, modding, 30);
            message.delete(30000);

        }else{
            if(arg.length < 14){
                post("Mod description need to contain at least 10 words", repondre, modding, 30);
                message.delete(30000);                
            }else{
                var url = tab[1];
                var urlImage = tab[2];
                var text =  makeAstring(tab, 3, " ");
                suggestMod(message.author, url, urlImage, text);
                nextModTime = Date.now() + 10000;
                message.delete();
                post("Mod posted in #modding", repondre, modding, 10);
            }
        }
    }

    else if((arg[0] === "delete" && arg[1] === "mod") || (arg[0] === "mod" && arg[1] === "delete")){
        if(!isModAdmin(message.member)){
            post("You are not allow to use this command :/ Only Modder or admin can.", repondre, modding, 10);
            message.delete(10000)
        }
        
        else if(tab.length < 4){
            post("Uncorrect argument. Please type ```"+prefix+"delete mod [number] [reason]```", repondre, modding, 30);
            message.delete(30000);
        }

        else if(isNaN(tab[2]) || Number(tab[2]) < 1 || Number(tab[2]) > data.modding.length){
            post("Uncorrect argument. Please type ```"+prefix+"delete mod [mod number between 1 and " + data.modding.length + "] [reason] ``` ", repondre, modding, 30);
            message.delete(30000);
        }

        else{
            var num = Number(tab[2]) - 1;
            var author = serv.members.find("id", data.modding[num][5]);
            author.sendMessage(message.author + " deleted your mod because : " + makeAstring(tab, 3, " "));
            author.sendMessage(getModdingText(num, ""));
            author.sendMessage("If you think this is an abuse, please send a DM to `" + botOwner + "`");

            post(message.author + " deleted this mod :", "", moddingLog, -1);
            post(getModdingText(num, ""), "", moddingLog, -1);
            post("Because of " + makeAstring(tab, 3, " "), "", moddingLog, -1);

            data.modding[num][3] = "!//deleted//!" + data.modding[num][3];
            saveData();
            message.delete();
            if(moddingMessage[num] !== ""){
                moddingMessage[num].delete();
            }

        }
    }

    else if((arg[0] === "rebuild" && arg[1] === "mod") || (arg[0] === "mod" && arg[1] === "rebuild")){
        setupModdingGalery();
    }



    

    else if(arg[0] === "postart"){      
        if(Date.now() < nextArtTime){
            post("Please wait 10sec between each art", repondre, art, 10);
            message.delete(60000);
        }else if(arg.length < 2){

            post("Uncorrect argument. Please type ```"+prefix+"suggest [url Art] [desription (optional)]```", repondre, art, 30);
            message.delete(30000);

        }else{
            var url = tab[1];
            if(checkURL(url)){
                var text =  makeAstring(tab, 2, " ");
                suggestArt(message.author, url, text);
                message.delete();
                nextArtTime = Date.now() + 10000;  
                post("Art posted in #👍art-gallery👾", repondre, art, 10);

            }else{
                post("Your image url seems invalid 😢", repondre, art, 60);
                message.delete(60*1000);
            }
        
        }
    }

    else if((arg[0] === "delete" && arg[1] === "art") || (arg[0] === "art" && arg[1] === "delete")){
        if(!isArtAdmin(message.member)){
            post("You are not allow to use this command :/ Only Artist or admin can.", repondre, art, 10);
            message.delete(10000)
        }
        
        else if(tab.length < 4){
            post("Uncorrect argument. Please type ```"+prefix+"delete art [number] [reason]```", repondre, art, 30);
            message.delete(30000);
        }

        else if(isNaN(tab[2]) || Number(tab[2]) < 1 || Number(tab[2]) > data.art.length){
            post("Uncorrect argument. Please type ```"+prefix+"delete art [art number between 1 and " + data.art.length + "] [reason] ``` ", repondre, art, 30);
            message.delete(30000);
        }

        else{
            var num = Number(tab[2]) - 1;
            var author = serv.members.find("id", data.art[num][5]);
            author.sendMessage(message.author + " deleted your art because : " + makeAstring(tab, 3, " "));
            author.sendMessage(getArtText(num, ""));
            author.sendMessage("If you think this is an abuse, please send a DM to `" + botOwner + "`");

            post(message.author + " deleted this art :", "", artLog, -1);
            post(getArtText(num, ""), "", artLog, -1);
            post("Because of " + makeAstring(tab, 3, " "), "", artLog, -1);

            data.art[num][2] = "!//deleted//!" + data.art[num][2];
            saveData();
            message.delete();
            if(artMessage[num] !== ""){
                artMessage[num].delete();
            }

        }
    }

    else if((arg[0] === "rebuild" && arg[1] === "art") || (arg[0] === "art" && arg[1] === "rebuild")){
        setupArtGalery();
    }


    else if(arg[0] === "rebootoff" && isAdmin(message.member)){
            
        artGalery.overwritePermissions(serv.id, {
            VIEW_CHANNEL: true
        })

        
        moddingGalery.overwritePermissions(serv.id, {
            VIEW_CHANNEL: true
        })

        
        suggestionGalery.overwritePermissions(serv.id, {
            VIEW_CHANNEL: true
        })

        post("Okay 😃", message.author, moddingLog, 15 );
        message.delete();

    }
    
    else if(arg[0] === "softban"){
        if(arg.length != 2){
            post("Incorrect argument :( ```/softban @someone```", repondre, here, 30);
            message.delete(10000);
        }else if(!(message.mentions.members.first())) {
            post("I can't find " + tab[1] + " :( ```/softban @someone```", repondre, here, 30);
            message.delete(10000);
        }else{ 
            var accused = message.mentions.members.first();
            console.log("Accused = " + accused);
            var myBool = false;
            
            if(isArtAdmin(message.member)){
                accused.addRole(serv.roles.find("name", "Ban from art"));
                myBool = true;
            }
            if(isSuggestionAdmin(message.member)){
                accused.addRole(serv.roles.find("name", "Ban from suggestion"));
                myBool = true;
            }
            if(isModAdmin(message.member)){
                accused.addRole(serv.roles.find("name", "Ban from mod"));
                myBool = true;
            }

            if(!myBool){
                post("Only artist/suggestor/modder can soft ban", repondre, here, 10);
                message.delete();
            }else{
                post(tab[1] + " has been soft ban", "", here, 10);
                message.delete()
            }
        }

    } 

    else if(arg[0] === "purge"){
        if(isAdmin(message.member)){
            here.fetchMessages({limit: 100}).then(d_msg => here.bulkDelete(d_msg));
            console.log("Razia");
        }
    }

    else if(arg[0] === "steal"){
        if(message.member.roles.find("name","Thief")){
            
            var lesMessages = offTopic.messages.array();
            var me = message.member;
            var victime = message;
            var longueur =  lesMessages.length;
            var trouve = false;

            if(longueur < 10){
                var value = longueur;
            }else{
                var value = 10;
            }
            if(longueur > 2){
                
                for(var i = longueur - 1; i > longueur-value+1; i--){
                    
                    if(!trouve && !lesMessages[i].author.bot && lesMessages[i].member !== me ){
                        victime = lesMessages[i];
                        trouve = true;
                    }
                }   
            }
            if(!trouve){
                post("I can't find anybody to steal :/", "", offTopic, 30);
            }else if(victime.member.roles.find("name","Money")){
                post("**"+message.author.username +" stole " + victime.author.username + "'s mom's credit card**", "", offTopic, -1);
                message.member.addRole(moneyRole);
                victime.member.removeRole(moneyRole);
            }else{
                post(message.author.username +" stole " + victime.author.username + "'s **" + randItem[rand(0, randItem.length)]+"**", "", offTopic, -1);
            }


            message.delete();

        }else{
            post("You don't have the ability `Sneaky Gloves`", repondre, offTopic, 30);
            message.delete(30000);
        }
    }
    
    else if(arg[0] === "hack"){
        if(message.member.roles.find("name","Hacker")){
            
            var lesMessages = offTopic.messages.array();
            var me = message.member;
            var victime = message;
            var longueur =  lesMessages.length;
            var trouve = false;

            if(longueur < 10){
                var value = longueur;
            }else{
                var value = 10;
            }
            if(longueur > 2){

                for(var i = longueur - 1; i > longueur-value+1; i--){
                    if(!lesMessages[i].author.bot && lesMessages[i].member !== me && !lesMessages[i].member.roles.find("name","Hacker")){
                        victime = lesMessages[i];
                        trouve = true;
                    }
                }
            }
            if(!trouve){
                post("I can't find anybody to hack :/ (*other" + getEmojie(getCharacterCode("Hacker"))+ " can't be hacked*)", "", offTopic, 30);
            }
            else if(victime.member.roles.find("name","Scientist")){
                if(message.member.roles.find("name","Money")){
                    post("**"+message.author.username +" hacked " + victime.author.username + "'s satelite and become an alien " + getEmojie(getCharacterCode("Alien")) + "**", "", offTopic, -1);
                    removeMain(message.member);
                    message.member.removeRole(moneyRole);
                    message.member.addRole(alienRole);
                }else{
                    post("You need more cash in order to hack " + victime.author.username + "'s satelite (bribe the goon / enrole other hacked to help you etc...) ", message.author, offTopic, 30);   
                }
                    
            }else if(victime.member.roles.find("name","Investment Banker")){
                post( getEmojie(getCharacterCode("Hacker")) + message.author +" hacked **" + victime.author + "'s portable ATM and stole his money** (hopefully " + victime.author.username + "'s ATM is inifnite)", "", offTopic, -1);
                message.member.addRole(moneyRole);  

            }else{
                post( getEmojie(getCharacterCode("Hacker")) + message.author +" hacked " + victime.author.username + "'s computer. But he didn't read e-mail -*that would be rude*", "", offTopic, 30);
            }


            message.delete();

        }else{
            post("You don't have the ability `Laptop`", repondre, offTopic, 30);
            message.delete(30000);
        }
    }
    
    else if(arg[0] === "selldrugs"){    
        if(message.member.roles.find("name","Drug Dealer")){
            
            if(here === blackMarket){
                if(message.member.roles.find("name","Engaged in Mafia")){
                    message.member.addRole(mafiaRole);
                    message.member.removeRole(engagedMafiaRole);
                    post(getEmojie(getCharacterCode("Mobster")) + " **i think we can trust you. You are now a Mobster as us 😈**", "", blackMarket, 90);
                }else{
                    message.member.addRole(moneyRole);
                    post(getEmojie(getCharacterCode("Mobster")) + " Thank you bro for this sugar, here is your pay - *You now have money*", repondre, blackMarket, 30);
                }
            }else{
                post(message.author.username +" is now selling sugar. " + getEmojie(getCharacterCode("DrugDealer")) + " use `"+prefix+"buyDrugs` to buy some sugar bro.", "", offTopic, 30);
                message.member.addRole(serv.roles.find("name","Selling sugar"));
            }
            
        }else{
            post("You don't have `sugar`", repondre, offTopic, 30);
            message.delete(30000);
        }
    }
    
    else if(arg[0] === "invisible"){
        if(message.member.roles.find("name","Assassin")){
            
            if(message.member.roles.find("name","Invisible")){
                message.member.removeRole(invisibleRole);
                post(getEmojie(getCharacterCode("Assassin")) + " your name is now **visible**", repondre, offTopic, 30);
            }else{
                message.member.addRole(invisibleRole);
                post(getEmojie(getCharacterCode("Assassin")) + " your name is now **invisible**", repondre, offTopic, 30);
            }


            message.delete();

        }else{
            post("You don't have the ability `invisible`", repondre, offTopic, 30);
            message.delete(30000);
        }
    }

    else if(arg[0] === "fire"){
        if(message.member.roles.find("name","Soldier")){
            post(getEmojie(getCharacterCode("Soldier")) + getEmojie(getCharacterCode("Soldier")) + getEmojie(getCharacterCode("Soldier")) + getEmojie(getCharacterCode("Soldier")) + getEmojie(getCharacterCode("Soldier")) + getEmojie(getCharacterCode("Soldier")) + getEmojie(getCharacterCode("Soldier")) + "*firing*", "", offTopic, 30);
            message.delete();

        }else{
            post("You don't have `ton of guns 😠`", repondre, offTopic, 30);
            message.delete(30000);
            
        }
    }
    
    else if(arg[0] === "friendphone"){
        if(message.member.roles.find("name","Gangster Crepe")){
            post(getEmojie(getCharacterCode("GangsterCrepe")) + getEmojie(getCharacterCode("GangsterCrepe")) + getEmojie(getCharacterCode("GangsterCrepe")) + getEmojie(getCharacterCode("GangsterCrepe")) + "Hey sista 😃", "", offTopic, 30);
            message.delete();

        }else if(message.member.roles.find("name","Gangster Blahd")){
            post(getEmojie(getCharacterCode("GangsterBlahd")) + getEmojie(getCharacterCode("GangsterBlahd")) + getEmojie(getCharacterCode("GangsterBlahd")) + getEmojie(getCharacterCode("GangsterBlahd")) + "Hey bro 😃", "", offTopic, 30);
            message.delete();

        }else{
            post("You don't have `a friend phone`", repondre, offTopic, 30);
            message.delete(30000);
            
        }
    }

    else if(arg[0] === "ook"){
        if(message.member.roles.find("name","Gorilla")){
            post(duplicateString(getEmojie(getCharacterCode("Gorilla")), rand(1,2)) + duplicateString(" ook", rand(0,3)) + duplicateString(getEmojie(getCharacterCode("Gorilla")), rand(1,2)) + duplicateString(" ook", rand(0,3)) + duplicateString(getEmojie(getCharacterCode("Gorilla")), rand(1,2)) + duplicateString(" ook", rand(0,3)), "", offTopic, 30);
            message.delete();

        }else{
            post("You don't speak `ook language`", repondre, offTopic, 30);
            message.delete(30000);
            
        }
    }

    else if(arg[0] === "buydrugs"){
        if(message.member.roles.find("name","Money")){
            
            var lesMessages = offTopic.messages.array();
            var me = message.member;
            var victime = message;
            var longueur =  lesMessages.length;
            var trouve = false;

            if(longueur < 10){
                var value = longueur;
            }else{
                var value = 10;
            }
            if(longueur > 2){
                
                for(var i = longueur - 1; i > longueur-value+1; i--){
                    
                    if(!trouve && !lesMessages[i].author.bot && lesMessages[i].member !== me && lesMessages[i].member.roles.find("name","Selling sugar")){
                        victime = lesMessages[i];
                        trouve = true;
                    }
                }   
            }
            if(!trouve){
                post("Nobody is selling sugar near by ...", "", offTopic, 30);
            }else{
                victime.member.removeRole(victime.member.roles.find("name","Selling sugar"));
                victime.member.addRole(moneyRole);
                message.member.removeRole(moneyRole);
                post(message.author + " bought " + victime.author + "'s sugar for " + rand(10,25) + " golds", "", offTopic, 30);
            }


            message.delete();


        }else{
            post("You don't have enough `money` to buy sugar 😦", repondre, offTopic, 30);
            message.delete(30000);
            
        }
    }
    
    else if(arg[0] === "callsupercops"){
        if(message.member.roles.find("name","UpperCruster")){
            post(duplicateString(getEmojie(getCharacterCode("SuperCop")),rand(1,4)) + " we are here sir ! Who shall we rekt ?" + duplicateString(getEmojie(getCharacterCode("SuperCop")),rand(1,4)), "", offTopic, 30);
            message.delete();

        }else{
            post("You `don't have the right` to press _da button_", repondre, offTopic, 30);
            message.delete(30000);
            
        }
    }
       
    else if(arg[0] === "givedrink"){
        if(message.member.roles.find("name","Bartender")){
            
            var lesMessages = offTopic.messages.array();
            var me = message.member;
            var victime = message;
            var longueur =  lesMessages.length;
            var trouve = false;

            if(longueur < 10){
                var value = longueur;
            }else{
                var value = 10;
            }
            if(longueur > 2){
                
                for(var i = longueur - 1; i > longueur-value+1; i--){
                    
                    if(!trouve && !lesMessages[i].author.bot && lesMessages[i].member !== me){
                        victime = lesMessages[i];
                        trouve = true;
                    }
                }   
            }
            if(!trouve){
                post("Nobody is near by ...", "", offTopic, 30);
                message.delete();
            }else{
                post(getEmojie(getCharacterCode("Bartender")) + message.author + " gave a coctail to " + victime.author + " and he " + randomEffect(), "", offTopic, 30);
                message.delete();
            }
        }else{
            post("You don't have a `Drink mixer`", repondre, offTopic, 30);
            message.delete(30000);
            
        }
    }
        
    else if(arg[0] === "heal"){
        if(message.member.roles.find("name","Doctor")){
            
            var lesMessages = offTopic.messages.array();
            var me = message.member;
            var victime = message;
            var longueur =  lesMessages.length;
            var trouve = false;

            if(longueur < 10){
                var value = longueur;
            }else{
                var value = 10;
            }
            if(longueur > 2){
                
                for(var i = longueur - 1; i > longueur-value+1; i--){
                    
                    if(!trouve && !lesMessages[i].author.bot && lesMessages[i].member !== me){
                        victime = lesMessages[i];
                        trouve = true;
                    }
                }   
            }
            if(!trouve){
                post("Nobody is near by ...", "", offTopic, 30);
                message.delete();
            }else{
                post(getEmojie(getCharacterCode("Doctor")) + message.author + " healed " + rand(32,80) + "HP to " + victime.author, "", offTopic, 30);
                message.delete();
            }
        }else{
            post("You are not a `Medical Professional`", repondre, offTopic, 30);
            message.delete(30000);
            
        }
    }
        
    else if(arg[0] === "donate"){
        if(message.member.roles.find("name","Investment Banker")){
            
            var lesMessages = offTopic.messages.array();
            var me = message.member;
            var victime = message;
            var longueur =  lesMessages.length;
            var trouve = false;

            if(longueur < 10){
                var value = longueur;
            }else{
                var value = 10;
            }
            if(longueur > 2){
                
                for(var i = longueur - 1; i > longueur-value+1; i--){
                    
                    if(!trouve && !lesMessages[i].author.bot && lesMessages[i].member !== me && ( lesMessages[i].member.roles.find("name","Gangster Blahd") || lesMessages[i].member.roles.find("name","Gangster Crepe"))){
                        victime = lesMessages[i];
                        trouve = true;
                    }
                }   
            }
            if(!trouve){
                post("You gived some money to help curring your adiction. Maybe a gangster could help you in another way", message.author, offTopic, 30);
                message.member.removeRole(moneyRole);
                message.delete();
            }else{
                post("You gived money to " + victime.author + " and he became a Drug Dealer to help you with your addiction", message.author, offTopic, 30);
                removeAndAddMain(victime.member, 6);
                message.member.removeRole(moneyRole);
                message.delete();
            }
        }else{
            post("You don't have any `adiction`. Why would you donate to help curring other peoples adiction", repondre, offTopic, 30);
            message.delete(30000);
            
        }
    }
    
    
    else if(arg[0] === "enslave"){
        if(message.member.roles.find("name","Slave Master")){
            post("**Enslaving people is illegual here !** We will punish you and make yourself a slave !", "", offTopic, 30);
            removeAndAddMain(message.member, )
            message.delete();

        }else{
            post("You don't have `ton of guns 😠`", repondre, offTopic, 30);
            message.delete(30000);
            
        }
    }
    
    
    else if(arg[0] === "fire"){
        if(message.member.roles.find("name","Soldier")){
            post("*firing*", "", offTopic, 30);
            message.delete();

        }else{
            post("You don't have `ton of guns 😠`", repondre, offTopic, 30);
            message.delete(30000);
            
        }
    }
    
    
    else if(arg[0] === "fire"){
        if(message.member.roles.find("name","Soldier")){
            post("*firing*", "", offTopic, 30);
            message.delete();

        }else{
            post("You don't have `ton of guns 😠`", repondre, offTopic, 30);
            message.delete(30000);
            
        }
    }
    
    
    else if(arg[0] === "fire"){
        if(message.member.roles.find("name","Soldier")){
            post("*firing*", "", offTopic, 30);
            message.delete();

        }else{
            post("You don't have `ton of guns 😠`", repondre, offTopic, 30);
            message.delete(30000);
            
        }
    }
    
    
    else if(arg[0] === "fire"){
        if(message.member.roles.find("name","Soldier")){
            post("*firing*", "", offTopic, 30);
            message.delete();

        }else{
            post("You don't have `ton of guns 😠`", repondre, offTopic, 30);
            message.delete(30000);
            
        }
    }
    
    
       
    
    else{
        post("Unknown command (type " + prefix + "help)", repondre , here, 20);
        message.delete(60000);
    }

}
