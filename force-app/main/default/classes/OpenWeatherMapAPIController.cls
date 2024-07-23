public with sharing class OpenWeatherMapAPIController {
    //Get general API key
    @AuraEnabled(cacheable=true)
    public static String getWeatherMapGeneralApiKey() {
        Open_Weather_Map_API_Key__mdt generalApiKey = new Open_Weather_Map_API_Key__mdt();

        try {
            generalApiKey = [SELECT Id, API_Key__c
                            FROM Open_Weather_Map_API_Key__mdt
                            WHERE DeveloperName = 'General_API_Key'
                            LIMIT 1];
        } catch (Exception e) {
            System.debug(e.getMessage());
        }

        return generalApiKey.API_Key__c;
    }
}