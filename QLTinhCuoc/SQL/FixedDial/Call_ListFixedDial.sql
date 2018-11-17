USE PowerCall
GO
/*
Author: Dungdv24
Desc: 11/11/2018
Desc: Danh sách đầu số
*/
ALTER PROCEDURE Call_ListFixedDial
    @Search INT = 2 ,--0 Search theo tất cả,1 search Tỉnh/TP:2 search Tỉnh/TP Loại Phone, 3: Theo đầu số
    @PostalCode VARCHAR(30) = '' ,
    @LocationID VARCHAR(20) = '2' ,
    @TypeFixedDialID VARCHAR(20) = '1' 
   
AS
    BEGIN

        DECLARE @qr NVARCHAR(200) = ' And 1 = 1 '
		 IF @Search = 3
            BEGIN
                SET @qr = ' And F.PostalCode = ''' + @PostalCode + ''''
            END
        IF @Search = 1
            BEGIN
                SET @qr = ' And L.LocationID  = ''' + @LocationID + ''''
            END
        IF @Search = 2
            BEGIN
                SET  @qr = ' And TF.TypeFixedDialID  = ''' + @TypeFixedDialID + ''''
                IF ISNULL(@PostalCode, '') <> ''
                    BEGIN
                        SET @qr = @qr
                            + ' And F.PostalCode = ''' + @PostalCode + ''''
                    END
            END
        DECLARE @query NVARCHAR(MAX) = N'
SELECT  F.PostalCode ,
        TF.TypeFixedDialName ,
        L.LocationName ,
        F.CreateBy ,
        F.Description,
		TF.TypeFixedDialID
FROM    dbo.FixedDial AS F
        JOIN dbo.TypeFixedDial AS TF ON TF.TypeFixedDialID = F.TypeFixedDialID
        JOIN dbo.Location AS L ON L.LocationID = F.LocationID
WHERE   F.Status = 1
        AND L.Status = 1
     ' + @qr +N' ORDER BY  TF.TypeFixedDialID '
        PRINT @query
        EXEC sp_executesql @query



    END

	
	