# RulePack v1 - Trace de formalisation

## Artefact
- RulePack: `SOURCES/rulepack.v1.json`
- Base d'extraction: `SOURCES/rules_extraction.v1.md`

## Clauses sources utilisees
- `SOURCES/convention des assistances.extracted.txt:1`
- `SOURCES/convention des assistances.extracted.txt:5`
- `SOURCES/convention des assistances.extracted.txt:1655`
- `SOURCES/convention des assistances.extracted.txt:1656`
- `SOURCES/convention des assistances.extracted.txt:1531`
- `SOURCES/convention des assistances.extracted.txt:1532`
- `SOURCES/convention des assistances.extracted.txt:1505`

## Champs explicitement non definis dans la source v1
- `leaveAcquisition.accrualFrequency`
- `carryOverPolicy.deadlineRule`
- `fractionnementPolicy.conditions`
- `rttPolicy.calculationMode`
- `rttPolicy.prorationMethod`

Ces champs sont gardes avec la valeur litterale `non_defini_dans_source_v1` pour eviter toute interpretation libre.
