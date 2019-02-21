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
#include <fstream>
#include <sstream>
#include <iostream>

/*using namespace std;

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

// callback function writes data to a std::ostream
static size_t data_write(void* buf, size_t size, size_t nmemb, void* userp)
{
   if(userp)
   {
      std::ostream& os = *static_cast<std::ostream*>(userp);
      std::streamsize len = size * nmemb;
      if(os.write(static_cast<char*>(buf), len))
         return len;
   }
   
   return 0;
}

/**
 * timeout is in seconds
 **/
CURLcode curl_read(const std::string& url, std::ostream& os, long timeout = 30)
{
   CURLcode code(CURLE_FAILED_INIT);
   CURL* curl = curl_easy_init();
   
   if(curl)
   {
      if(CURLE_OK == (code = curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, &data_write))
         && CURLE_OK == (code = curl_easy_setopt(curl, CURLOPT_NOPROGRESS, 1L))
         && CURLE_OK == (code = curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L))
         && CURLE_OK == (code = curl_easy_setopt(curl, CURLOPT_FILE, &os))
         && CURLE_OK == (code = curl_easy_setopt(curl, CURLOPT_TIMEOUT, timeout))
         && CURLE_OK == (code = curl_easy_setopt(curl, CURLOPT_URL, url.c_str())))
      {
         code = curl_easy_perform(curl);
      }
      curl_easy_cleanup(curl);
   }
   return code;
}

int main()
{
   curl_global_init(CURL_GLOBAL_ALL);
   
   std::ofstream ofs("output.html");
   if(CURLE_OK == curl_read("http://google.com", ofs))
   {
      // Web page successfully written to file
   }
   
   std::ostringstream oss;
   if(CURLE_OK == curl_read("http://google.com", oss))
   {
      // Web page successfully written to string
      std::string html = oss.str();
   }
   
   if(CURLE_OK == curl_read("http://google.com", std::cout))
   {
      // Web page successfully written to standard output (console?)
   }
   
   curl_global_cleanup();
}
