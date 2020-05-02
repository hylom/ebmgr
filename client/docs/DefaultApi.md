# EbookManagerEbmgrApp.DefaultApi

All URIs are relative to *http://localhost:3333/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**booksGet**](DefaultApi.md#booksGet) | **GET** /books | 

<a name="booksGet"></a>
# **booksGet**
> [Book] booksGet()



Returns all books list

### Example
```javascript
import EbookManagerEbmgrApp from 'ebook_manager__ebmgr_app';
let defaultClient = EbookManagerEbmgrApp.ApiClient.instance;


let apiInstance = new EbookManagerEbmgrApp.DefaultApi();
apiInstance.booksGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**[Book]**](Book.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

