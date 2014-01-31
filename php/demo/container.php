<HTML>
<HEAD>
<TITLE>
<?= $_GET["fr"]; ?>
</TITLE>
<Frameset cols="38%, 62%">

<Frame name="contFrame" src="Control.html">
<Frame name="textFrame" src="./fragments/transformedFragments/<?= $_GET["fr"]; ?>.html">

</Frameset>
</HTML>