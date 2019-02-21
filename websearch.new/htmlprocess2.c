//
//  htmlprocess2.c
//
//  Created by Gideon Hanse on 21/02/2019.
//

#include <stdio.h>
#include <assert.h>
#include <string.h>
#include <curl/curl.h>
#include <haut/string_util.h>
#include <haut/haut.h>
#include <haut/tag.h>

using namespace std;

typedef struct {
   FILE *tmp1; // a pointer to the file save the data of HTML file
   FILE *tmp2; // a pointer to the file save web-links from the URL
   // .. Add your own datastructures here ...
} state_t;

string data;

size_t write_callback (void *buffer, size_t size, size_t nmemb, FILE *stream) {
   for (int c = 0; c<size*nmemb; c++) {
      data.push_back(buf[c]);
   }
   return size*nmemb;
}

void GetWebPage(char * myurl) {
   CURL * curl;
   curl = curl_easy_init();
   curl_easy_setopt(curl, CURLOPT_URL, myurl);
   curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, &writeCallback);
   curl_easy_setopt(curl, CURLOPT_VERBOSE, 1L);
   
   curl_easy_perform(curl);
   
   cout << endl << data << endl;
   cin.get();
   
   curl_easy_cleanup(curl);
}

int main(int argc, char *argv[]) {
   if (argc != 2) return 1;
   GetWebPage( argv[1]);
   
   
   return 0;
}
