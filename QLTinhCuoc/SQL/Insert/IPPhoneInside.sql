INSERT INTO dbo.IPPhoneInside
        ( StaffID ,
          ServiceProviderID ,
          IPPhone ,
          Status ,
          Description ,
          CreateDate ,
          CreateBy ,
          UpdateBy
        )
VALUES  ( 1 , -- StaffID - int
          1 , -- ServiceProviderID - int
          '4727' , -- IPPhone - varchar(50)
          1 , -- Status - int
          N'Cấp cho Dungdv24' , -- Description - nvarchar(500)
          GETDATE() , -- CreateDate - datetime
          'System' , -- CreateBy - varchar(50)
          ''  -- UpdateBy - varchar(50)
        )