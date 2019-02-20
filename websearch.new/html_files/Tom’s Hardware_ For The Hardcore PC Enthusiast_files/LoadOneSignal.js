/* 
<link rel="manifest" href="/manifest.json" />
<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async ></script> 
<script id="onesignal_tag" data-app-id-http="${PAGE_DOMAIN:ONESIGNAL_ID}" data-app-id-https="${PAGE_DOMAIN:ONESIGNAL_HTTPS_ID}" src="https://dev.assets.purch.com/creative-templates/feature-memb-1337-746/js/membership/OneSignal/LoadOneSignal.js" ></script>
*/
var OneSignal = OneSignal || [];
var one_signal_start=new Date().getTime();
var popover_allowed=false;
var gtmdl = window.gtmDataLayer || window.dataLayer || [];
var onesignal_tag = document.getElementById('onesignal_tag');
var appIdHttp = onesignal_tag.getAttribute("data-app-id-http");
var appIdHttps = onesignal_tag.getAttribute("data-app-id-https");

function get_notification_label(label){
    var new_label = window.location.href.split(":")[0];
    if(popover_allowed){ new_label += " - popover"; }

    return (new_label+" - "+label);
}

function get_notification_time(){
    return ((new Date().getTime())-one_signal_start);
}

//gtmdl.push({"event":"onesignal_on_page", "action":"onesignal_on_page", "label":get_notification_label("loaded"), "value":get_notification_time()});

function getPageCategory(){
    if (typeof(Purch)!=='undefined' && typeof(Purch.Omniture)!=='undefined' && typeof(Purch.Omniture.params)!=='undefined' && typeof(Purch.Omniture.params.eVar2)!=='undefined' && typeof(Purch.Omniture.params.eVar2)==='string' ) {
        return Purch.Omniture.params.eVar2.toLowerCase();
    } else if (typeof(BOM)!=='undefined' && typeof(BOM.Omniture)!=='undefined' && typeof(BOM.Omniture.params)!=='undefined' && typeof(BOM.Omniture.params.eVar2)!=='undefined' && typeof(BOM.Omniture.params.eVar2)==='string' ) {
        return BOM.Omniture.params.eVar2.toLowerCase();
    } else if (typeof(tmntag)!=='undefined' && typeof(tmntag.g)!=='undefined' && typeof(tmntag.g.ccat1)!=='undefined' && typeof(tmntag.g.ccat1)==='string' ) {
        return tmntag.g.ccat1.toLowerCase();
    } else if (typeof(ccat)!=='undefined' && typeof(ccat)==='string' ) {
        return ccat.toLowerCase();
    }
    return undefined;
}

function getPageTags(){
    if (typeof(Purch)!=='undefined' && typeof(Purch.Omniture)!=='undefined' && typeof(Purch.Omniture.params)!=='undefined' && Purch.Omniture.params.prop34) {
        return Purch.Omniture.params.prop34.toLowerCase();
    }
    return null;
}

function isUserCategorySet(){
    return OneSignal.getTags().then(function(tags) {
        if(tags && tags.category!==undefined){ return true; }
            
        return false;
    });
}

function updateUserPageViewCount(){
    OneSignal.getTags().then(function(tags) {
        var count=1;
        if(tags && tags.page_view_count!==undefined){
            count=tags.page_view_count;}
        OneSignal.sendTags({
            page_view_count: count
        });
    });
}

function updateUserTags(){
    var category=getPageCategory();
    if(category!==undefined){
        isUserCategorySet().then(function(category_set){
            if(!category_set){
                OneSignal.sendTags({
                    category: category
                });
            }
        });
        OneSignal.sendTags({
            last_viewed_category: category,
            last_view_time:new Date().getTime()
        });
    }
}

var onesignal_user_metadata;

function getUserMetaData(){
    console.log("OneSignal: Getting User Metadata");
    return OneSignal.getTags().then(function(tags) {
        if(tags && tags.user_metadata!==undefined){
            onesignal_user_metadata=JSON.parse(tags.user_metadata);
        }else{
            onesignal_user_metadata={};}
    });
}

function updateUserMetaData(){
    console.log("OneSignal: Updating User Metadata");
    OneSignal.sendTags({
        user_metadata: JSON.stringify(onesignal_user_metadata)
    });
}

function process_onesignal_id(one_id) {
    console.log("OneSignal User ID:", one_id);
    var cookies = document.cookie;
    if (!/oidProced=1/.test(cookies)) {
        var d = new Date();
        d.setTime(d.getTime() + (365*24*60*60*1000));
        document.cookie = "oidProced=1;expires=" + d.toUTCString() + ";path=/";
        var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', 'onesignal-gus');
        httpRequest.setRequestHeader('oneid', one_id);
        httpRequest.send();
    }
}

function updateOneSignalUser(shouldUpdate) {
    if (shouldUpdate) {
        updateUserTags();
        updateUserPageViewCount();
        OneSignal.getUserId().then(process_onesignal_id);
    }
}

function updateCategoryCount(){
    console.log("OneSignal: Updating Category Counts");
    if(onesignal_user_metadata.categories===undefined){
        onesignal_user_metadata.categories={};}
    var category=getPageCategory();
    if(category!==undefined){
        if(onesignal_user_metadata.categories[category]===undefined){
            onesignal_user_metadata.categories[category]=1;
        }else{
            onesignal_user_metadata.categories[category]+=1;}
    }
    updateUserMetaData();
}

OneSignal.push(function() {
    if (OneSignal.isPushNotificationsSupported()) {
        updateUserTags();
        updateUserPageViewCount();
        getUserMetaData().then(function(){updateCategoryCount();});
        //gtmdl.push({"event":"onesignal_notifications_supported", "action":"push_notification_support", "label":get_notification_label("supported"), "value": get_notification_time()});
    }else{
        //gtmdl.push({"event":"onesignal_notifications_supported", "action":"push_notification_support", "label":get_notification_label("unsupported"), "value": get_notification_time()});
    }


    if(window.location.href.split(":")[0] === 'https'){
        console.log('Onesignal:HTTPS init');
        OneSignal.init({
            appId: appIdHttps,
            requiresUserPrivacyConsent: false,
            autoRegister: false,
            persistNotification: false
        });
        if (!/onesignal_shown=1/.test(document.cookie)){
            OneSignal.registerForPushNotifications();
            var d = new Date();
            d.setTime(d.getTime() + (3*24*60*60*1000));
            document.cookie = "onesignal_shown=1;expires=" + d.toUTCString() + ";path=/";
        }
    }
    else{
        console.log('Onesignal:HTTP init');
        OneSignal.init({
            appId: appIdHttp,
            requiresUserPrivacyConsent: false,
            autoRegister: false,
            persistNotification: false
        });
        OneSignal.showHttpPrompt({force: false});
    }

    OneSignal.isPushNotificationsEnabled().then(function(isEnabled) {
        //gtmdl.push({"event":"onesignal_current_notifications", "action":"current_subscription_status", "label": get_notification_label(isEnabled), "value": get_notification_time()} );
    });

    OneSignal.getNotificationPermission(function(permission) {
        //gtmdl.push({"event":"onesignal_current_permission", "action":"browser_permission", "label": get_notification_label(permission), "value": get_notification_time()});
    });

    OneSignal.on('popupLoad', function () {
        gtmdl.push({"event":"onesignal_popup_load", "action":"impression", "label":get_notification_label("popup"), "value": get_notification_time()});
    });

    OneSignal.on('popupClose', function () {
        gtmdl.push({"event":"onesignal_popup_close", "action":"close", "label":get_notification_label("popup"), "value": get_notification_time()});
    });

    OneSignal.on('popoverShown', function () {
        gtmdl.push({"event":"onesignal_popover_shown", "action":"impression", "label":get_notification_label("popover"), "value": get_notification_time()});
    });

    OneSignal.on('permissionPromptDisplay', function (permissionChange) {
        gtmdl.push({"event":"onesignal_permission_prompt_display", "action":"native_permission_prompt", "label":get_notification_label("display"), "value": get_notification_time()});
    });

    OneSignal.on('popoverAllowClick', function () {
        gtmdl.push({"event":"onesignal_popover_allowed", "action":"allow", "label":get_notification_label("popover"), "value": get_notification_time()});
        popover_allowed=true;
    });

    OneSignal.on('popoverCancelClick', function () {
        gtmdl.push({"event":"onesignal_popover_cancelled", "action":"deny", "label":get_notification_label("popover"), "value": get_notification_time()});
    });

    OneSignal.on('popoverClosed', function () {
        gtmdl.push({"event":"onesignal_popover_closed", "action":"close", "label":get_notification_label("popover"), "value": get_notification_time()});
    });

    OneSignal.on('customPromptClick', function(promptClick) {
        var gtmdl = window.gtmDataLayer ||  window.dataLayer || [];
        if(promptClick.result==='denied'){
            gtmdl.push({"event":"onesignal_prompt_clicked", "action":"deny", "label":get_notification_label("custom_prompt"), "value": get_notification_time()});
        }
        else if(promptClick.result==='granted'){
            gtmdl.push({"event":"onesignal_prompt_clicked", "action":"allow", "label":get_notification_label("custom_prompt"), "value": get_notification_time()});
        }
        else{
            gtmdl.push({"event":"onesignal_prompt_clicked", "action":"custom_prompt_clicked", "label":get_notification_label("unhandled "+promptClick.result), "value": get_notification_time()});
        }
    });

    OneSignal.on('notificationPermissionChange', function(permissionChange) {
        var gtmdl = window.gtmDataLayer ||  window.dataLayer || [];
        gtmdl.push({"event":"onesignal_permission_changed", "action":"native_permission_prompt", "label":get_notification_label(permissionChange.to), "value": get_notification_time()});
    });

    OneSignal.on('subscriptionChange', function (isSubscribed) {
        var gtmdl = window.gtmDataLayer ||  window.dataLayer || [];
        gtmdl.push({"event":"onesignal_subsciption_changed",  "action":"subsciption_changed", "label": get_notification_label(isSubscribed), "value": get_notification_time()});
        updateOneSignalUser(isSubscribed);
    });
});