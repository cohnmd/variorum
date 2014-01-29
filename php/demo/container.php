<HTML>
<HEAD>
<TITLE>
<?= $_GET["fr"]; ?>
</TITLE>
<Frameset cols="62%, 38%">
<Frame name="textFrame" src="./fragments/transformedFragments/<?= $_GET["fr"]; ?>.html">
<Frame name="contFrame" src="Control.html">
</Frameset>
</HTML>