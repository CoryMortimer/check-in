const checkInTemplate = (groupName, listOfEmails, closingDate, replyToDomain) => {
  return `<!doctype html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

  <head>
    <title> </title>
    <!--[if !mso]><!-- -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
      #outlook a {
        padding: 0;
      }

      body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      table,
      td {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }

      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }

      p {
        display: block;
        margin: 13px 0;
      }
    </style>
    <!--[if mso]>
          <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
    <!--[if lte mso 11]>
          <style type="text/css">
            .mj-outlook-group-fix { width:100% !important; }
          </style>
          <![endif]-->
    <style type="text/css">
      @media only screen and (min-width:480px) {
        .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }
      }
    </style>
    <style type="text/css">
    </style>
  </head>

  <body>
    <div style="">
      <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
        >
          <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
        <![endif]-->
      <div style="margin:0px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">

          <tr>

              <td
                 class="" style="vertical-align:top;width:600px;"
              >
            <![endif]-->
                <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:helvetica;font-size:20px;line-height:1;text-align:center;color:#F45E43;">Check In</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <p style="border-top:solid 4px #F45E43;font-size:1;margin:0px auto;width:100%;"> </p>
                        <!--[if mso | IE]>
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #F45E43;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px"
          >
            <tr>
              <td style="height:0;line-height:0;">
                &nbsp;
              </td>
            </tr>
          </table>
        <![endif]-->
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:helvetica;font-size:20px;line-height:1;text-align:left;color:#000000;">Hello!</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:helvetica;font-size:20px;line-height:1;text-align:left;color:#000000;">You are invited to join a group newsletter! Simply send an email to ${replyToDomain} to let the group know how you have been doing this past month.</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:helvetica;font-size:20px;line-height:1;text-align:left;color:#000000;">The group named ${groupName} consists of memebers with the emails of ${listOfEmails}.</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:helvetica;font-size:20px;line-height:1;text-align:left;color:#000000;">The finalized newsletter will be sent out after ${closingDate}. The newsletter will contain the replies of everyone in this group.</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:helvetica;font-size:20px;line-height:1;text-align:left;color:#000000;">You are welcome to let the group know how you have been doing this past month. This is a great time to catch up those you may not have had the chance to speak to.</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:helvetica;font-size:20px;line-height:1;text-align:left;color:#000000;">Thank you,</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:helvetica;font-size:20px;line-height:1;text-align:left;color:#000000;">The Check In Team</div>
                      </td>
                    </tr>
                  </table>
                </div>
                <!--[if mso | IE]>
              </td>

          </tr>

                    </table>
                  <![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--[if mso | IE]>
            </td>
          </tr>
        </table>
        <![endif]-->
    </div>
  </body>

  </html>`;
};

module.exports = { checkInTemplate, };
