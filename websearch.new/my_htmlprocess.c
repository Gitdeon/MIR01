/*
 Gideon Hanse (s1630784), last modified: 22/02/2019
 
 Compiling :
 gcc -std=c99 my_htmlprocess.c -o my_htmlprocess -lcurl -lhaut \-Ihaut-html/include -Lhaut-html/lib -Wall
 
 Usage: ./my_htmlprocess <url>
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <curl/curl.h>
#include <sys/stat.h>
#include <haut/haut.h>
#include <haut/tag.h>
#include <haut/string_util.h>

static char * myurl;

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

size_t write_callback(void *ptr, size_t size, size_t nmemb, struct string *s)
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

void myAttribute( haut_t* p, strfragment_t* key, strfragment_t* value ) {
   
   if( haut_currentElementTag( p ) == TAG_A ) { //check if link
      if( strfragment_icmp( key, "href" ) && value && value->data ) {
	printf( myurl );
	printf( "%.*s\n", (int)value->size, value->data );
      }
   }
}

void myImageAttribute( haut_t* p, strfragment_t* key, strfragment_t* value ) {
   
   if( haut_currentElementTag( p ) == TAG_IMG ) { //check if image link
      if( strfragment_icmp( key, "src" ) && value && value->data ) {
         printf( myurl );
         printf( "%.*s\n", (int)value->size, value->data );
       }
   }
}

char * GetWebPage(char * myurl) {
   /* Initialize variables and string to save the html in */
   CURL *curl;
   CURLcode res;
   curl = curl_easy_init();
   if(curl) {
      struct string s;
      init_string(&s);
      
      /* Set options and perform curl */
      curl_easy_setopt(curl, CURLOPT_URL, myurl);
      curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
      curl_easy_setopt(curl, CURLOPT_WRITEDATA, &s);
      res = curl_easy_perform(curl); 
      return s.ptr;
      free(s.ptr);
      curl_easy_cleanup(curl);

   }
   return NULL;
}

char *GetLinksFromWebPage (char *myhtmlpage, char *myurl) {
   /* Prepare buffer and parser */
   struct stat htmlstatus;
   int html_size;
   html_size = htmlstatus.st_size;
   haut_t parser;
   haut_init( &parser );
   
   /* Provide settings and start parsing */
   haut_setInput ( &parser, myhtmlpage, html_size);
   parser.events.attribute = myAttribute;
   haut_parse( &parser );
   
   /* Clean up */
   haut_destroy( &parser );
   free (myhtmlpage);
   return NULL;
}

char *GetImageLinksFromWebPage (char *myhtmlpage, char *myurl) {
   /* Prepare buffer and parser */
   struct stat htmlstatus;
   int html_size;
   html_size = htmlstatus.st_size;
   haut_t parser;
   haut_init( &parser);
   
   /* Provide settings and start parsing */
   haut_setInput( &parser, myhtmlpage, html_size);
   parser.events.attribute = myImageAttribute;
   haut_parse( &parser);
   
   /* Clean up */
   haut_destroy ( &parser);
   free (myhtmlpage);
   return NULL;
}

int main(int argc, char * argv[]) {
   if( argc != 2 ) {
      printf("Usage: ./htmlprocess <url>");
      return 1;
   }
   myurl = argv[1];
   printf ("All links on page: \n\n");
   GetLinksFromWebPage(GetWebPage(argv[1]), argv[1]);
   printf ("All image links on page: \n\n");
   GetImageLinksFromWebPage(GetWebPage(argv[1]), argv[1]);
   return 0;
}
