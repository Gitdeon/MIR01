/* 
 * MIR html downloading/parsing demo version 2019
 *
 * Goal of this demo: 
   1. Download the html from the URL using libcurl;
   2. Extract the weblinks information from the URL using the Haut-html API;
   In addition, we are planning to add the function to extract other types of multimedia informations
   Compile the demo program with this command:

   gcc htmlprocess.c -o htmlprocess -Ihaut-html/include -Lhaut-html/lib -lcurl -lhaut
   
   Run the program with this command:
   ./htmlprocess www.liacs.nl
*/

#include <stdio.h> 
#include <assert.h>
#include <string.h>
#include <curl/curl.h>
#include <haut/string_util.h>
#include <haut/haut.h>
#include <haut/tag.h>

/* We use this structure to encapsulate any additional data we might need during parsing.
 * An instance of this structure is passed along through the parser's state object, 
 * which we can access at any time from one of the callback functions.
 * (Think of it as a safe alternative of using global variables) */
typedef struct {
    FILE *tmp1; // a pointer to the file save the data of HTML file
    FILE *tmp2; // a pointer to the file save web-links from the URL
    // .. Add your own datastructures here ...
} state_t;

/* In this function, the HTML-file is written and HTML-code is passed to the parser. 
 * This function is called by CURL whenever data becomes available, which can be a chunk or the whole file at once*/
static size_t 
write_callback(char *buffer, size_t size, size_t nmemb, haut_t* parser)
{ 
    /* First of all, retrieve our custom state object */
    state_t* myState =(state_t*)parser->userdata;
    assert( myState );
    
    /* save the HTML file in tmp1 */
    fwrite( buffer, size, nmemb, (FILE *)myState->tmp1 );
    /* the size of the received data */
    size_t realsize = size * nmemb; 

    /* Pass the data chunk to the parser, nothing else needs to be done here.
     * Note that if the parser encounters a token we are interested in, 
     * it will automatically call our callback function. */
    haut_parseChunk( parser, buffer, realsize );
    
    return realsize;
} 

/* This function is called everytime the parser has processed an attribute.
 * Arguments are a pointer to the parser object, the key and the value of the attribute.
 * In case of a void-attribute, value may contain a null-pointer.
 */
void
attribute_callback( haut_t* p, strfragment_t* key, strfragment_t* value ) {

    /* First of all, retrieve our custom state object */
    state_t* myState =(state_t*)p->userdata;
    assert( myState );

    /* We need to know what element this attribute belongs to,
     * for this we use haut_currentElementTag(), which returns an
     * enumerated value of one of the standard HTML5 tags.
     */
    if( haut_currentElementTag( p ) == TAG_A ) {
        // So this is a link, now we're interested in the HREF attribute
        if( strfragment_icmp( key, "href" ) && value && value->data && value->size > 0 ) {
            printf( "%.*s\n", (int)value->size, value->data );

            /* Save the weblink to tmp2 */ 
            fwrite( value->data, value->size, 1, (FILE *)myState->tmp2 );
            fwrite( "\n", 1, 1, (FILE *)myState->tmp2 );
        }

        /* Note that key and value are both char-pointer
         * in a wrapper structure strfragment_t. This structure contains
         * a data and a size field. See also haut/string_util.h 
         * 
         * The pointers in key and value are only valid during this function,
         * if you need the data later, it should be copied! 
         */
    }
}

/* This function downloads the webpage at @url and runs
 * the Haut-HTML parser with state-object @parser on its contents.*/
static void process_url( char * url, haut_t *parser )
{
   /* curl_easy_init() initializes CURL and this call must have a corresponding call to curl_easy_cleanup() */
   CURL *curl = curl_easy_init();
   
   /* Tell CURL the URL address we are going to download */
   curl_easy_setopt( curl, CURLOPT_URL, url );
   
   /* Pass a pointer to the function write_callback( char *ptr, size_t size, size_t nmemb, void *userdata)
    * write_callback() gets called by libcurl as soon as there is data received,
    * and we can process the received data, such as saving and weblinks extraction. */
   curl_easy_setopt( curl, CURLOPT_WRITEFUNCTION, write_callback );
   
   /* Set the `userdata' argument of the write_callback function to contain our parser pointer */
   curl_easy_setopt( curl, CURLOPT_WRITEDATA, parser );
   
   /* CURL_FOLLOWLOCATION set to 1 tells the CURL to follow any `Location:'-header that the server sends as part of a HTTP header.
    * This means that the library will re-send the same request on the new location
    * and follow new `Location:'-headers all the way until no more such headers are returned.*/
   curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1);
   
   /* Tell CURL to perform its operation (download the url) */
   CURLcode curl_res = curl_easy_perform(curl);
   
   if( curl_res == 0 ) {
      printf( "HTML file downloaded successfully\n" );
   } else {
      printf( "Could not dowload webpage\n" );
   }
   
   /* Tell CURL to deallocate its resources */
   curl_easy_cleanup(curl);
}


char * GetWebPage(char *myurl, haut_t *parser) {
	 CURL *curl = curl_easy_init();
	 if(curl) {
		 curl_easy_setopt(curl, CURLOPT_URL, myurl);
		 curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
		 curl_easy_setopt(curl, CURLOPT_WRITEDATA, parser);
		 CURLcode curl_res = curl_easy_perform(curl);
	 }
	 curl_easy_cleanup(curl);
	 return parser;
}


int main(int argc, char *argv[])
{   
    /* We need one argument */
    if( argc != 2 ) return 1;

    /* Create an instance of the parser's state structure and initialize */
    haut_t parser;
    haut_init( &parser );
    
    /* Construct our custom state object locally ... */
    state_t myState; 

    /* ... and a point to it from the parser's state object so we can access it later */
    parser.userdata = &myState;

    /* Set the path to save the html file */
    myState.tmp1 = fopen( "/tmp/htmldata.html", "w" );
    /* Set the path to save the extracted web-links */
    myState.tmp2 = fopen( "/tmp/weblinksdata.html", "w" );


    /* Setup our event handler.
     * The Haut parser uses a SAX-like interface, which means it will not generate a DOM-tree for us.
     * Instead, we supply the parser with callbacks of events that we are interested in.
     * If the parser encounters one of these events it will let us know by using the callback.
     * In this case, we are only interesting in attributes (<a href=...>)
     */
    parser.events.attribute =attribute_callback; // function pointer of type attribute_event

    /* Run download function */ 
    char webpage = GetWebPage( argv[1], &parser );

    /* Release the memory allocated by Haut */
    haut_destroy( &parser );

    /* Close the file tmp and tmp2 and return */
    fclose( myState.tmp1 );
    fclose( myState.tmp2 );
    return 0;
}
