SELECT m.music_name AS nome_musica,
CASE 
WHEN n.music_name LIKE '%Bard%' 
	THEN REPLACE(n.music_name, 'Bard', 'QA')
WHEN n.music_name LIKE '%Amar%' 
	THEN REPLACE(n.music_name, 'Amar', 'Code review')
WHEN n.music_name LIKE '%Pais%' 
	THEN REPLACE(n.music_name, 'Pais', 'Pull Requests')
WHEN n.music_name LIKE '%SOUL%' 
	THEN REPLACE(n.music_name, 'SOUL', 'CODE')
WHEN n.music_name LIKE '%SUPERSTAR%' 
	THEN REPLACE(n.music_name, 'SUPERSTAR', 'SUPERDEV')
END AS novo_nome
FROM SpotifyClone.music AS m
INNER JOIN SpotifyClone.music AS n
ON m.music_id = n.music_id
WHERE n.music_name IS NOT NULL;
