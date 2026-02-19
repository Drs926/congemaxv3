# Extraction structurée des règles (v1)

## Source
- PDF: `SOURCES/convention des assistances.pdf`
- SHA256: `23689F1B4FF380317698A068630B4A3E4137FF6A7825FD3C4149C7ADA3EC02B6`
- Texte extrait: `SOURCES/convention des assistances.extracted.txt`

## Clauses extraites (sans interprétation)

### Règle E-001 — Base CP annuelle
- Référence: `SOURCES/convention des assistances.extracted.txt:1655`
- Extrait: "La durée des congés payés est conforme à la législation en vigueur soit 25 jours ouvrés."
- Donnée structurée:
  - type: `paid_leave_base_days`
  - value: `25`
  - unit: `jours_ouvres`

### Règle E-002 — Jour supplémentaire après ancienneté
- Référence: `SOURCES/convention des assistances.extracted.txt:1655`
- Extrait: "Après 1 an de présence (...) cette durée est portée à 26 jours ouvrés."
- Référence complémentaire: `SOURCES/convention des assistances.extracted.txt:1656`
- Extrait: "Ce jour supplémentaire s'ajoute au droit acquis au titre de la première période de référence complète."
- Donnée structurée:
  - type: `paid_leave_after_one_year`
  - threshold: `1_year_presence`
  - value: `26`
  - unit: `jours_ouvres`

### Règle E-003 — Référence annuelle et jours fériés (contexte temps de travail)
- Référence: `SOURCES/convention des assistances.extracted.txt:1503`
- Extrait: "5 semaines de congés payés (soit 25 jours ouvrés...)"
- Référence complémentaire: `SOURCES/convention des assistances.extracted.txt:1505`
- Extrait: "jours fériés légaux ne coïncidant pas avec un samedi ou un dimanche"
- Donnée structurée:
  - type: `holiday_reference_context`
  - paid_leave_days_reference: `25_jours_ouvres`
  - legal_holidays_reference: `holidays_not_on_weekend`

### Règle E-004 — Jours fériés comptés dans l'exemple annuel
- Référence: `SOURCES/convention des assistances.extracted.txt:1511`
- Extrait: "-9 jours fériés :"
- Donnée structurée:
  - type: `holiday_count_example`
  - value: `9`
  - scope: `example_year_2001`

## Points explicitement non trouvés / non exploitables à ce stade
- RTT explicite: non trouvé dans le texte extrait.
- Règles d'arrondi demi-journée: non trouvées explicitement.
- Ordre d'application Override entreprise -> RulePack -> Paramètre utilisateur -> Fallback: non décrit dans la convention, relève du contrat produit.

## Artefact machine
- Index brut des occurrences par mots-clés: `SOURCES/rules_extraction.v1.json`
