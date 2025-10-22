* Prompt Source: "Provide anonymized ABAP snippet representing inventory fetch for modernization."
SELECT matnr, maktx, labst
  FROM mara INNER JOIN mard ON mara~matnr = mard~matnr
  INTO TABLE @DATA(lt_materials)
  WHERE mard~lgort = '0001'.

LOOP AT lt_materials ASSIGNING FIELD-SYMBOL(<ls_mat>).
  WRITE: / <ls_mat>-matnr, <ls_mat>-maktx, <ls_mat>-labst.
ENDLOOP.
