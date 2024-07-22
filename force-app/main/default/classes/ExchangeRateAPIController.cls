public with sharing class ExchangeRateAPIController {
    //Get general API key
    @AuraEnabled(cacheable=true)
    public static String getExchangeRateGeneralApiKey() {
        Exchange_Rate_API_Key__mdt generalApiKey = new Exchange_Rate_API_Key__mdt();

        try {
            generalApiKey = [SELECT Id, API_Key__c
                            FROM Exchange_Rate_API_Key__mdt
                            WHERE DeveloperName = 'General_API_Key'
                            LIMIT 1];
        } catch (Exception e) {
            System.debug(e.getMessage());
        }

        return generalApiKey.API_Key__c;
    }
}