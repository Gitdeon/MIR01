#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <curl/curl.h>

struct string {
   char *ptr;
   size_t len;
};

void init_string(struct string *s) {
   s->len = 0;
   s->ptr = malloc(s->len+1);
   if (s->ptr == NULL) {
      fprintf(stderr, "malloc() failed\n");
      exit(EXIT_FAILURE);
   }
   s->ptr[0] = '\0';
}

size_t writefunc(void *ptr, size_t size, size_t nmemb, struct string *s)
{
   size_t new_len = s->len + size*nmemb;
   s->ptr = realloc(s->ptr, new_len+1);
   if (s->ptr == NULL) {
      fprintf(stderr, "realloc() failed\n");
      exit(EXIT_FAILURE);
   }
   memcpy(s->ptr+s->len, ptr, size*nmemb);
   s->ptr[new_len] = '\0';
   s->len = new_len;
   
   return size*nmemb;
}

char * GetWebPage(char * myurl) {
   CURL *curl;
   CURLcode res;
   curl = curl_easy_init();
   if(curl) {
      struct string s;
      init_string(&s);
      
      curl_easy_setopt(curl, CURLOPT_URL, myurl);
      curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, writefunc);
      curl_easy_setopt(curl, CURLOPT_WRITEDATA, &s);
      res = curl_easy_perform(curl);
      
      return s.ptr;
      free(s.ptr);
      curl_easy_cleanup(curl);
   }
   return NULL;
}

int main(int argc, char * argv[]) {
   if( argc != 2 ) {
      printf("Usage: ./htmlprocess <url>");
      return 1;
   }
   printf(GetWebPage(argv[1]),'w');
   FILE *fp = fopen("tmp/test.html", "ab");
   fputs(GetWebPage(argv[1]), fp);
   fclose(fp);
   return 0;
}

