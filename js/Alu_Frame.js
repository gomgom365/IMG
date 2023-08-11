$(document).ready(function () {

    kindsOption = {};
    var SheetApi = "https://script.google.com/macros/s/AKfycbx7--UxfUNkg_UbDTSgZWxTaRAgFsO1-WrVfNULzJRr8SQaPqYG5d3Esq7bBCJ55f-gDA/exec";

    $.getJSON(SheetApi, function(data) {
        // 데이터를 처리하는 코드를 작성합니다.
        console.log(data);
        kindsOption =data;
      });


    // function Option() {
    //     google.script.run.withSuccessHandler(function (jsonData) {
    //         // JSON 데이터를 파싱하여 객체로 변환
    //         kindsOption = JSON.parse(jsonData);
    //         // 데이터를 처리하는 코드
    //     }).getDataAsJSON();
    // }
    // Option();

    var kinds = $('input[name="kind-radio"]:checked').val();//선택되어진 종류
    var support = $('input[name="support-radio"]:checked').val();//선택되어진 발통
    var screen = $('input[name="screen-radio"]:checked').val();//선택되어진 화면

    var asor // 폭
    var bsor // 길이
    var getwidth=0;
    var getlength=0;

    Test = function () {

        $("#" + "supporter" + "_row" + "> td[name=계산]").text("con");
    };

    $("#input-data, #input-data-b,  .plusopt,#kinds ,#support, #screen").on('change', function (event) { // 값들이 변동되면 작동
        // if (this.id != "input-data" && this.type != "radio") { // 크기 창 제외(+ 때문)
        if ($(this).is("input")) {
            $(this).val($(this).val().replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')); //숫자만 입력
        }

        asor = Math.min($("#input-data").val(), $("#input-data-b").val());
        bsor = Math.max($("#input-data").val(), $("#input-data-b").val());
        getwidth = asor <= 700 ? 700 : getround(asor, 2); // 700 이하는 700
        getlength = bsor <= 1000 ? 1000 : getround(bsor, 2); // 1000 이하는 1000;

        kinds = $('input[name="kind-radio"]:checked').val();//선택되어진 종류
        support = $('input[name="support-radio"]:checked').val();//선택되어진 발통
        screen = $('input[name="screen-radio"]:checked').val();//선택되어진 화면


        //돌출을 선택하면 보여지는 옵션
        if (kinds != '돌출') {
            $("#support > input").prop("disabled", true); //설정
            $("#support > input").prop("checked", false); //설정
            $("#d-support").addClass('d-none');

            support = "";
        } else {
            $("#d-support").removeClass('d-none');
            $("#support > input").prop("disabled", false); //설정
            //설정
            if (support) {

            } else {
                $("#support-radio-1").prop("checked", true);
                support = 0;//설정
            }
        }

        // 까치발 계산
        if ($('input[id="supporter"]').is(":checked")) {
            if (this.id != 'supporter' && $(this).hasClass('form-check-input')) {

            } else {
                //  수정하는 칸이 입력칸
                let supporterSize;
                var supporterCount = 2;
                var supporterP;
                let cost; // 개당 금액

                if ($(this).hasClass('form-control')) {
                    supporterSize = $("#supportersize").val();
                    supporterCount = $("#supportercount").val();
                } else {
                    checkTrue(getwidth, "supportersize");
                    supporterSize = $("#supportersize").val();
                    checkTrue(supporterCount, "supportercount");
                    supporterCount = $("#supportercount").val();
                }

                cost = (supporterSize / 100 + 3) * 500;
                if ($(this).hasClass('pay')) {
                    supporterP = $("#supporterpay").val();
                } else {
                    supporterP = getsupporter(supporterSize, supporterCount);//까치발
                }

                $("#supporterpay").val(supporterP);
                $("#supporter_row> td[name=계산]").text(supporterSize + "폭 : "  + cost + " * " + supporterCount + "=" + supporterP); //항목의 가격
            }
        }
        // 등조립
        if ($('input[id="light_asmb"]').is(":checked")) { 
            if (this.id != 'light_asmb' && $(this).hasClass('form-check-input')) {
            } else {

                var lightCount
                var lprice = kinds == '돌출' ? 10000 : 7000;
                var lightP
                var lightWidthCount = Math.ceil((getwidth - 200) / 180 + 1);
                var lightHeightCount = Math.round(getlength / 1150 + 0.25);
                // 폭 상하 100 띄우고(-200)간격이 180을 넘지않게 올림(ceil) 길이쪽은 1200 등 겹침 고려해서 1150, 반올림하면 작은폭에 들어가는 600 보정
                var lightCountCalu = lightWidthCount * lightHeightCount;

                if ($(this).hasClass('form-control')) {
                    lightCount = $("#light_asmbcount").val();

                } else {
                    checkTrue(lightCountCalu, "light_asmbcount");
                    lightCount = $("#light_asmbcount").val();
                }

                if ($(this).hasClass('pay')) {
                    lightP = $("#light_asmbpay").val();
                } else {
                    lightP = lightCount * lprice;;//까치발
                }

                $("#light_asmbpay").val(lightP);
                $("#light_asmb_row> td[name=계산]").text("( " +lightWidthCount + " * " + lightHeightCount + "=" + lightCountCalu +")*"+lprice+"="+lightP); //항목의 가격
            }
        }


       // 채널보강
        if ($('input[id="re_force"]').is(":checked")) { 
            if (this.id != 're_force' && $(this).hasClass('form-check-input')) {
            } else {
                var angleP
                if ($(this).hasClass('pay')) {
                    angleP = $("#re_forcepay").val();
                } else {
                    angleP = 20000;
                }
                $("#re_forcepay").val(angleP);
           }
        }


        // 각가공
        if ($('input[id="re_angle"]').is(":checked")) { 
            if (this.id != 're_angle' && $(this).hasClass('form-check-input')) {
            } else {
                var angleP
                if ($(this).hasClass('pay')) {
                    angleP = $("#re_anglepay").val();
                } else {
                    angleP = 20000;
                }
                $("#re_anglepay").val(angleP);
           }
        }
       // 도장 5000,8000
        if ($('input[id="re_paint"]').is(":checked")) { 
            if (this.id != 're_paint' && $(this).hasClass('form-check-input')) {

            } else {
                var palenhth
                var calenhth = getround((asor * 1 + bsor * 1) * 2, 3);
                var paintP
                var paprice = kinds == '돌출' ? 10000 : 7000;
                checkTrue(calenhth, "re_paintlength");
                palenhth = $("#re_paintlength").val();
                paintP = palenhth * paprice / 1000;
                if ($(this).hasClass('pay')) {
                    paintP = $('#re_paintpay').val();
                } else {
                    paintP = paintP < 30000 ? 30000 : paintP
                }
                $("#re_paintpay").val(paintP);
                $("#re_paint_row> td[name=계산]").text((calenhth/1000)+"m *"+paprice+"="+paintP); //항목의 가격
            }
        }

       // 후판
        if ($('input[id="re_back"]').is(":checked")) { 
            if (this.id != 're_back' && $(this).hasClass('form-check-input')) {

            } else {
                let width_re_back;
                let height_re_back;
                let re_backP;
                let re_backPCalu ;
                let re_backPSquere ; 
                width_re_back = getwidth <1000 ? 1000 : getwidth;
                height_re_back = getlength;
                re_backPSquere = width_re_back*height_re_back/1000000 
                re_backPCalu = getround(re_backPSquere * 2000,3);

                if ($(this).hasClass('pay')) {
                    re_backP = $('#re_backpay').val();
                } else {
                    re_backP = re_backPCalu < 10000 ? 10000 : re_backPCalu;
                }
                $("#re_backpay").val(re_backP);
                $("#re_back_row> td[name=계산]").text(re_backPSquere+"㎡ * 2000 = " + re_backP); //항목의 가격
            }
        }

        //각 옵션선택시 table에 보여지기
        $(":checkbox").each(function () {  //":checkbox:checked"\
            var table_thisId = "#" + this.id + "_row";
            var explanation
            switch (table_thisId) {
                case "supporter_row": explanation = "January";
                    break;
                case "light_asmb_row": explanation = "February";
                    break;
                case "re_force_row": explanation = "March";
                    break;
                case "re_angle_row": explanation = "April";
                    break;
                case "re_paint_row": explanation = "May";
                    break;
                case "re_back_row": explanation = "June";
                    break;
                default: explanation = "Invalid month";
                    break;
            }
            if ($(this).is(":checked")) {
                $(this).parent().parent().parent().children('input').prop("disabled", false); //선택 그룹 비활성화
                $(table_thisId).removeClass('d-none'); // 항목  tr 을 보이게함
                $(table_thisId + "> td[name=value]").text(nono($("#" + this.id + "pay").val())); //항목의 가격
                // $(table_thisId + "> td[name=계산]").text("hmm"); //항목의 가격



            } else {
                $(this).parent().parent().parent().children('input').val("0");
                $(this).parent().parent().parent().children('input').prop("disabled", true);
                $(table_thisId).addClass('d-none');
            }
        });

        var supportPsave = nono($("#supporterpay").val());
        var forcrP = nono($("#re_forcepay").val());
        var angleP = nono($("#re_anglepay").val());
        var paintPsave = nono($("#re_paintpay").val());
        var backP = nono($("#re_backpay").val());
        var sizecal = nono(calu()[0]);
        var total = sizecal + supportPsave + nono(lightP) + forcrP + angleP + paintPsave + backP;
        // var total = nono(sizecal) + nono(supportPsave) + nono(lightP) + nono(forcrP) + nono(angleP)
        //     + nono(paintPsave) + nono(backP);
        total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 3자리 콤마 표시
        $("#totalpay").val(total);
        $("#siseCalu_row> td[name=계산]").text(calu()[1] + "*"+ (getlength / 1000) + "m =" + sizecal);
        $("#siseCalu_row> td[name=value]").text(sizecal);
    });

    function nono(a) {
        if (a == undefined) { return 0; } else { return Number(a); }
    }

    function calu() {
        var Price;
        var proportion;
        if (asor && bsor) {
             // 가격 비례상수수
            proportion = support == 0 ? kindsOption[screen][getwidth][kinds] : kindsOption[screen][getwidth]['발통(x)'];
            Price = getround((proportion * (getlength / 1000)), 3);
        } else {
            Price = 0;
        }
        var returnPrice=[Price,proportion]
        return returnPrice;
    }

    //반올림
    function getround(num, position) {
        var mround
        var positional = 10 ** position // 10 에 n 제곱
        mround = Math.round(num / positional) * positional
        return (mround);
    }
    // 값이 있을때만 값을 입력
    function checkTrue(get, SID) { // 값. 해당칸 아이디

        if (get) {
            $("#" + SID).val(get);
        };

    }

    //까치발 가격계산 700 :5,000 이후 500원씩 증가
    function getsupporter(size, count) {
        let calu = (size / 100 + 3) * 500 * count;
        var price = getround(calu, 3);

        return price;
    }

});