<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:tei="http://www.tei-c.org/ns/1.0"
    version="1.0">
    <xsl:param name="scriptPath" select="'../../scripts'"/>
    <xsl:template match="/">
        <HTML>

            <xsl:call-template name="htmlHeaders"/>
            <xsl:apply-templates select="//tei:teiHeader"/>
            <body>            
                <xsl:apply-templates select="//tei:div1"/>
            </body>
            
            <script type="text/javascript">               
                
            loadApp();
            manageContext();
            
            </script>
        </HTML>    
    </xsl:template>
    <xsl:template match="tei:teiHeader">
        <script type="text/javascript">
          var title = "<xsl:value-of select="//tei:title"/>";
          regFragment(title);
          var buildInfo = "<xsl:value-of select="//tei:publicationStmt/tei:p"/>";
          regBuildInfo(buildInfo);
        </script>
    </xsl:template>
    <xsl:template match="tei:div1">
        <script type="text/javascript">
            var playName = "<xsl:value-of select="./@xml:id"/>";
            regPlayName(playName);
            var source = "<xsl:value-of select="./tei:div2/@xml:id"/>";
            regSource(source);
            var fragNumber = "<xsl:value-of select="//tei:div3/@xml:id"/>";
            
            loadTags(fragNumber);
            loadTrans(fragNumber);
        </script>
        <xsl:apply-templates/>
    </xsl:template>
    <xsl:template match="tei:div2">
    <xsl:element name="span"><xsl:attribute name="id">sourceText</xsl:attribute>
    <xsl:apply-templates/>
    </xsl:element>
    </xsl:template>

    <xsl:template match="tei:div3">
        <xsl:element name="span"><xsl:attribute name="id">fragment</xsl:attribute>
            <xsl:element name="Blockquote"><xsl:apply-templates/>
        </xsl:element></xsl:element>
    </xsl:template>
    
    <xsl:template match="tei:l">

        
        <xsl:apply-templates/>
        <xsl:element name="BR"/>
        
    </xsl:template>
    
    <xsl:template match="tei:app">
                
        <xsl:variable name="l" select="../@n"/>
        <xsl:variable name="appNum" select="count(preceding::tei:app)"/>
        <xsl:element name="span">
        <xsl:attribute name="id"><xsl:value-of select="$appNum"/>
        </xsl:attribute>
        
        <xsl:choose>
        <xsl:when test="./tei:lem">                
            <xsl:value-of select="./tei:lem"/>
            <script type="text/javascript">               
                var position = <xsl:value-of select="$appNum"/>;
                var line = <xsl:value-of select="$l"/>;
                var reading = "<xsl:value-of select="./tei:lem"/>";
                var editor = "<xsl:value-of select="./tei:lem/@wit"/>";           
                regEntry(position, line, reading, editor);
            </script>
        </xsl:when>
        
        <xsl:otherwise>
            <xsl:value-of select="./tei:rdg[1]"/>
        </xsl:otherwise>
        </xsl:choose>
            <xsl:for-each select="./tei:rdg">
                <script type="text/javascript">               
                    var position = <xsl:value-of select="$appNum"/>;
                    var line = <xsl:value-of select="$l"/>;
                    var reading = "<xsl:value-of select="."/>";
                    var editor = "<xsl:value-of select="./@wit"/>";           
                    regEntry(position, line, reading, editor);
                </script>    
            </xsl:for-each>
        </xsl:element>
        

        
    </xsl:template>
    
    <xsl:template name="htmlHeaders">    
        <head>
            <meta charset="UTF-8"/>
                     
            <script type="text/javascript" src="{$scriptPath}/appManager.js"></script>
            <script type="text/javascript" src="{$scriptPath}/transManager.js"></script>
            <script type="text/javascript" src="{$scriptPath}/infoManager.js"></script>
        </head>        
    </xsl:template>
    
</xsl:stylesheet>