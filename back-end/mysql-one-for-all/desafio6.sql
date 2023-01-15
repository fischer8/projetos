SELECT CAST(MIN(m.`value`) AS DECIMAL(3,2)) AS faturamento_minimo,
FORMAT(MAX(m.`value`),2) AS faturamento_maximo,
FORMAT(AVG(m.`value`),2) AS faturamento_medio,
FORMAT(SUM(m.`value`),2) AS faturamento_total
FROM SpotifyClone.membership AS m
INNER JOIN SpotifyClone.`user` AS u
ON u.membership_id = m.membership_id;
