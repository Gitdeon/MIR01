/* Parsing shootout_file , Gideon Hanse
 *
 * usage: ./getlinks to parse all files in html_files folder.
 * Make sure the folder with html_files is in the same directory.
 *
 *
 * Modified getlinks - Example program using Haut; all credits to:
 *
 * https://github.com/mickymuis/haut-html
 *
 * Micky Faas <micky@edukitty.org>
 * Copyright 2017-2018
 * Leiden Institute of Advanced Computer Science, The Netherlands
 */

#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <haut/haut.h>
#include <haut/tag.h>
#include <haut/string_util.h>
#include <time.h>

/* This function is called everytime the parser has processed an attribute.
 * Arguments are a pointer to the parser object, the key and the value of the attribute.
 * In case of a void-attribute, value may contain a null-pointer.
 */
void
myAttribute( haut_t* p, strfragment_t* key, strfragment_t* value ) {
    
    /* We need to know what element this attribute belongs to,
     * for this we use haut_currentElementTag(), which returns an
     * enumerated value of one of the standard HTML5 tags.
     * If you need a custom tag, we should keep track of it yourself
     * by listening to the `element_open_event`
     */
    if( haut_currentElementTag( p ) == TAG_A ) {
        // So this is a link, now we're interested in the HREF attribute
        if( strfragment_icmp( key, "href" ) && value && value->data )
            printf( "%.*s\n", (int)value->size, value->data );

        /* Note that key and value are both char-pointer
         * in a wrapper structure strfragment_t. This structure contains
         * a data and a size field. See also haut/string_util.h 
         * 
         * The pointers in key and value are only valid during this function,
         * if you need the data later, it should be copied! 
         * */
    }
}

int
main( int argc, char** argv ) {
    const char *htmlfiles[9]; /* Create and fill array with html sources */
    htmlfiles[0] = "html_files/Computer Science at Leiden University - Leiden University.html";
    htmlfiles[1] = "html_files/Home - Universiteit Leiden.html";
    htmlfiles[2] = "html_files/Google Nieuws.html";
    htmlfiles[3] = "html_files/IMDb - Movies, TV and Celebrities - IMDb.html";
    htmlfiles[4] = "html_files/io9 - We come from the future..html";
    htmlfiles[5] = "html_files/Tom’s Hardware_ For The Hardcore PC Enthusiast.html";
    htmlfiles[6] = "html_files/Amazon.com_ Online Shopping for Electronics, Apparel, Computers, Books, DVDs & more.html";
    htmlfiles[7] = "html_files/Hotmail, Outlook en Skype inloggen - Laatste nieuws - MSN Nederland.html";
    htmlfiles[8] = "html_files/Product reviews, how-tos, deals and the latest tech news - CNET.html";
    htmlfiles[9] = "html_files/Wikipedia, the free encyclopedia.html";
    
    time_t start = clock();    
    for (int x = 0; x < 10; x++) {
    	/* First the dull part; read the filename from the command-line and read its contents */
    	if( argc != 1 ) {
        	fprintf( stderr, "Usage: %s \n", argv[0] );
        	return -1;
    	}
   	 const char* filename = htmlfiles[x];
       	 struct stat filestatus;
   	 int file_size;
   	 char* file_contents;
   	 FILE* file;

    	/* Check the existence of the input file and determine its size */
    	if ( stat(filename, &filestatus) != 0) {
        	fprintf( stderr, "File %s not found\n", filename );
       	 	return 1;
   	 }

    	file_size = filestatus.st_size;
    	/* Allocate a buffer large enough to hold the input file */
    	file_contents = (char*)malloc( sizeof( char ) * filestatus.st_size );
    	if ( file_contents == NULL) {
       	     fprintf( stderr, "ERROR: unable to allocate %d bytes\n", file_size );
       	     return -1;
    	}

    	/* Open the given file and write it to our buffer */
   	 file =fopen( filename, "r" );
    	if( !file ) {
        	 fprintf( stderr, "ERROR: Could not open `%s'\n", filename );
        	 free( file_contents );
        	return -1;
    	}
   	 if ( fread( file_contents, file_size, 1, file) != 1 ) {
       		 fprintf( stderr, "ERROR: Unable to read content of %s\n", filename );
       		 fclose( file );
         	 free( file_contents );
   	    	 return 1;
    	}
   	fclose( file );
    

        /* Now the actual parsing begins,
    	 * Construct parser object 
    	 */
  	 for(int i = 0; i < 1000; i++) {
   		 haut_t p;
  	 	 haut_init( &p );

    		/* Set the buffer */
    		haut_setInput( &p, (char*)file_contents, file_size );

   	       /* Setup our event handler.
     		* Haut uses a SAX-like interface, which means it will not generate a DOM-tree for us.
     		* Instead, we supply the parser with callbacks of events that we are interested in.
    	        * If the parser encounters one of these events it will let us know by using the callback.
     	        * In this case, we are only interesting in attributes (<a href=...>)
     		*/
   		p.events.attribute =myAttribute; // function pointer of type attribute_event

   		 /* Begin the parsing */
    		 haut_parse( &p );
   

   		 /* Clean up */
 		   haut_destroy( &p );
   	 }
   	 free( file_contents );
    }
    time_t stop = clock();
    double elapsed = ((double)(stop - start))/CLOCKS_PER_SEC;
    printf("Total parsing time for 1000 runs: %f seconds. \n", elapsed); 
    return 0;
}

