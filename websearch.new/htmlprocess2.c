//
//  htmlprocess2.c
//
//  Created by Gideon Hanse on 21/02/2019.
//

#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <string.h>
#include <curl/curl.h>
#include <haut/string_util.h>
#include <haut/haut.h>
#include <haut/tag.h>

/*
 typedef struct {
   FILE *tmp1; // a pointer to the file save the data of HTML file
   FILE *tmp2; // a pointer to the file save web-links from the URL
   // .. Add your own datastructures here ...
} state_t;

string data;

size_t write_callback (void *buffer, size_t size, size_t nmemb, FILE *stream) {
   for (int c = 0; c<size*nmemb; c++) {
      data.push_back(buffer[c]);
   }
   return size*nmemb;
}

void GetWebPage(char * myurl) {
   CURL * curl;
   curl_global_init(CURL_GLOBAL_ALL);
   curl = curl_easy_init();
   curl_easy_setopt(curl, CURLOPT_URL, myurl);
   curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, &writeCallback);
   curl_easy_setopt(curl, CURLOPT_VERBOSE, 1L);
   
   curl_easy_perform(curl);
   
   cout << endl << data << endl;
   cin.get();
   
   curl_easy_cleanup(curl);
   curl_global_cleanup();
}

int main(int argc, char *argv[]) {
   if (argc != 2) return 1;
   GetWebPage( argv[1]);
   
   
   return 0;
}
*/

// Define our struct for accepting LCs output
struct BufferStruct
{
   char * buffer;
   size_t size;
};

// This is the function we pass to LC, which writes the output to a BufferStruct
static size_t WriteMemoryCallback
(void *ptr, size_t size, size_t nmemb, void *data)
{
   size_t realsize = size * nmemb;
   
   struct BufferStruct * mem = (struct BufferStruct *) data;
   
   mem->buffer = realloc(mem->buffer, mem->size + realsize + 1);
   
   if ( mem->buffer )
   {
      memcpy( &( mem->buffer[ mem->size ] ), ptr, realsize );
      mem->size += realsize;
      mem->buffer[ mem->size ] = 0;
   }
   return realsize;
}


int main()
{
   
   curl_global_init( CURL_GLOBAL_ALL );
   CURL * myHandle;
   CURLcode result; // We’ll store the result of CURL’s webpage retrieval, for simple error checking.
   struct BufferStruct output; // Create an instance of out BufferStruct to accept LCs output
   output.buffer = NULL;
   output.size = 0;
   myHandle = curl_easy_init ( ) ;
   
   /* Notice the lack of major error checking, for brevity */
   
   curl_easy_setopt(myHandle, CURLOPT_WRITEFUNCTION, WriteMemoryCallback); // Passing the function pointer to LC
   curl_easy_setopt(myHandle, CURLOPT_WRITEDATA, (void *)&output); // Passing our BufferStruct to LC
   curl_easy_setopt(myHandle, CURLOPT_URL, "http://www.liacs.nl");
   result = curl_easy_perform( myHandle );
   curl_easy_cleanup( myHandle );
   
   FILE * fp;
   fp = fopen( "/tmp/example.html","w");
   if( !fp )
      return 1;
   fprintf(fp, output.buffer );
   fclose( fp );
   
   if( output.buffer )
   {
      free ( output.buffer );
      output.buffer = 0;
      output.size = 0;
   }
   
   printf("LibCurl rules!\n");
   return 0;
}

