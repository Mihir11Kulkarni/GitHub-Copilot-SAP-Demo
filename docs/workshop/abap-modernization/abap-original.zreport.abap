SELECT matnr, maktx, labst
  FROM mara INNER JOIN mard ON mara~matnr = mard~matnr
  INTO TABLE @DATA(lt_materials)
  WHERE mard~lgort = '0001'.
