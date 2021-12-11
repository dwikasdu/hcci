import React from 'react'
import './dokumen.css'

function index(props) {
    var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    // var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum&#39;at', 'Sabtu'];
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    // var thisDay = date.getDay(),
    //     thisDay = myDays[thisDay];
    var yy = date.getYear();
    var year = (yy < 1000) ? yy + 1900 : yy;
    // document.write(thisDay + ', ' + day + ' ' + months[month] + ' ' + year);
    return (
        <div className="data-print" style={{ size: "A3 landscape!important", margin: "0!important" }}>
            <div className="dokumen"
                style={{ display: "block", position: "relative" }}
            >

                <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" viewBox="0 0 16535 11693" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <defs>
                        <clipPath id="id0">
                            <path d="M0 0l16535 0 0 11693 -16535 0 0 -11693z" />
                        </clipPath>
                        <clipPath id="id1">
                            <path d="M0 11693l16535 0 0 -2244c-2755,0 -5511,955 -8267,955 -2756,0 -5512,-955 -8268,-955l0 2244z" />
                        </clipPath>
                        <clipPath id="id2">
                            <path d="M0 11693l16535 0 0 -310c-2755,0 -5511,-461 -8267,-461 -2756,0 -5512,461 -8268,461l0 310z" />
                        </clipPath>
                        <clipPath id="id3">
                            <path d="M7937 10051l662 0 499 0 117 0 405 0c-223,0 -404,180 -405,403l0 0c0,419 0,-129 0,291 0,160 -94,293 -213,310l1 0c0,377 -629,127 -735,465 -107,-338 -735,-88 -735,-465l0 0c-119,-17 -212,-150 -212,-310 0,-420 0,128 0,-291l0 0c-2,-223 -183,-403 -405,-403l405 0 117 0 499 0z" />
                        </clipPath>
                        <clipPath id="id4">
                            <path d="M7429 10148l1678 0 0 845 -1678 0 0 -845z" />
                        </clipPath>
                        <clipPath id="id5">
                            <rect x="7429" y="10148" width="1678" height="845" />
                        </clipPath>
                        <clipPath id="id6">
                            <path d="M7937 10051l662 0 499 0 117 0 405 0c-223,0 -404,180 -405,403l0 0c0,419 0,-129 0,291 0,160 -94,293 -213,310l1 0c0,377 -629,127 -735,465 -107,-338 -735,-88 -735,-465l0 0c-119,-17 -212,-150 -212,-310 0,-420 0,128 0,-291l0 0c-2,-223 -183,-403 -405,-403l405 0 117 0 499 0z" />
                        </clipPath>
                        <linearGradient id="id7" gradientUnits="userSpaceOnUse" x1="16355.8" y1="10861.3" x2="13068.8" y2="9488.25">
                            <stop offset="0" style={{ stopOpacity: "1", stopColor: "#045847" }} />
                            <stop offset="1" style={{ stopOpacity: "1", stopColor: "#078068" }} />
                        </linearGradient>
                        <linearGradient id="id8" gradientUnits="userSpaceOnUse" x1="8243.64" y1="2262.04" x2="8300.36" y2="-17.9961">
                            <stop offset="0" style={{ stopOpacity: "1", stopColor: "#E5FFFA" }} />
                            <stop offset="1" style={{ stopOpacity: "1", stopColor: "#C4E6DF" }} />
                        </linearGradient>
                        <linearGradient id="id9" gradientUnits="userSpaceOnUse" x1="-0" y1="9942.11" x2="16535.4" y2="9942.11">
                            <stop offset="0" style={{ stopOpacity: "1", stopColor: "#A47A49" }} />
                            <stop offset="0.501961" style={{ stopOpacity: "1", stopColor: "#FACA88" }} />
                            <stop offset="1" style={{ stopOpacity: "1", stopColor: "#A47A49" }} />
                        </linearGradient>
                        <linearGradient id="id10" gradientUnits="userSpaceOnUse" x1="8491.67" y1="10019.7" x2="8066.62" y2="11643.2">
                            <stop offset="0" style={{ stopOpacity: "1", stopColor: "#A47A49" }} />
                            <stop offset="0.541176" style={{ stopOpacity: "1", stopColor: "#FACA88" }} />
                            <stop offset="1" style={{ stopOpacity: "1", stopColor: "#A47A49" }} />
                        </linearGradient>
                        <linearGradient id="id11" gradientUnits="userSpaceOnUse" x1="8282" y1="1491.96" x2="8262" y2="-1.53937">
                            <stop offset="0" style={{ stopOpacity: "1", stopColor: "#F5FFFD" }} />
                            <stop offset="0.588235" style={{ stopOpacity: "1", stopColor: "#DDF3EE" }} />
                            <stop offset="1" style={{ stopOpacity: "1", stopColor: "#C4E6DF" }} />
                        </linearGradient>
                        <linearGradient id="id12" gradientUnits="userSpaceOnUse" xlinkHref="#id10" x1="15272.4" y1="8417.6" x2="14047.5" y2="11605.5">
                        </linearGradient>
                        <linearGradient id="id13" gradientUnits="userSpaceOnUse" xlinkHref="#id7" x1="14525.8" y1="11688.5" x2="14898.8" y2="9593.4">
                        </linearGradient>
                        <linearGradient id="id14" gradientUnits="userSpaceOnUse" xlinkHref="#id7" x1="3466.67" y1="10861.3" x2="179.614" y2="9488.25">
                        </linearGradient>
                        <linearGradient id="id15" gradientUnits="userSpaceOnUse" xlinkHref="#id10" x1="2487.89" y1="8417.6" x2="1263.04" y2="11605.5">
                        </linearGradient>
                        <linearGradient id="id16" gradientUnits="userSpaceOnUse" xlinkHref="#id7" x1="1636.65" y1="11688.5" x2="2009.64" y2="9593.4">
                        </linearGradient>
                    </defs>
                    <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer" />
                        <polygon className="fil0" points="0,0 16535,0 16535,11693 0,11693 " />
                        <g style={{ clipPath: "url(#id0)" }}>
                            <g id="_2735047068320">
                                <g>
                                    <polygon id="1" className="fil1 str0" points="-2092,8446 -3516,7019 -4940,8446 -3516,9873 " />
                                    <polygon className="fil2" points="-3091,5099 -3449,5460 -3805,5099 -3449,4740 " />
                                    <polygon className="fil3" points="-1127,8960 -2200,7907 -3273,8960 -2200,10012 " />
                                    <polygon className="fil4" points="-1741,8960 -2168,8513 -2594,8960 -2168,9406 " />
                                    <polygon className="fil5" points="-1929,8971 -2170,8721 -2408,8971 -2170,9222 " />
                                    <polygon className="fil1 str1" points="-858,8961 -2168,7591 -3478,8961 -2168,10330 " />
                                    <polygon className="fil5" points="-2353,7416 -3956,8933 -5560,7416 -3956,5902 " />
                                    <polygon className="fil6" points="-3321,7225 -3959,7868 -4596,7225 -3959,6582 " />
                                    <polygon className="fil1 str2" points="-2391,6869 -3954,8446 -5519,6869 -3954,5292 " />
                                    <polygon className="fil7" points="-3632,7230 -3973,6874 -4312,7230 -3973,7586 " />
                                    <polygon className="fil7" points="-3516,4589 -4396,5477 -5276,4589 -4396,3700 " />
                                </g>
                                <g>
                                    <polygon className="fil1 str3" points="21734,9396 23158,7969 24582,9396 23158,10823 " />
                                    <polygon className="fil2" points="22733,6049 23091,6410 23447,6049 23091,5690 " />
                                    <polygon className="fil3" points="20769,9910 21842,8857 22915,9910 21842,10963 " />
                                    <polygon className="fil4" points="21383,9910 21810,9463 22236,9910 21810,10356 " />
                                    <polygon className="fil5" points="21571,9922 21811,9671 22050,9922 21811,10172 " />
                                    <polygon className="fil1 str4" points="20500,9911 21810,8541 23119,9911 21810,11280 " />
                                    <polygon className="fil5" points="21994,8367 23598,9883 25202,8367 23598,6852 " />
                                    <polygon className="fil6" points="22963,8175 23601,8818 24238,8175 23601,7532 " />
                                    <polygon className="fil1 str5" points="22033,7819 23596,9396 25161,7819 23596,6242 " />
                                    <polygon className="fil7" points="23274,8180 23615,7824 23954,8180 23615,8536 " />
                                    <polygon className="fil7" points="23158,5539 24038,6427 24918,5539 24038,4651 " />
                                </g>
                            </g>
                        </g>
                        <polygon className="fil1" points="0,0 16535,0 16535,11693 0,11693 " />
                        <path className="fil8" d="M4 0l16536 0 0 2244c-2756,0 -5221,-2042 -7977,-2042 -2756,0 -5803,2042 -8559,2042l0 -2244z" />
                        <path className="fil9" d="M9680 10040c106,0 192,86 192,192l0 537 -590 0 0 -389c-43,-35 -69,-65 -69,-148 0,-83 360,-192 467,-192z" />
                        <path className="fil9" d="M6893 10040c-106,0 -193,86 -193,192l0 537 591 0 0 -389c42,-35 69,-65 69,-148 0,-83 -361,-192 -467,-192z" />
                        <g>
                            <g style={{ clipPath: "url(#id1)" }}>
                                <polygon className="fil10" points="16526,9063 16531,9244 -48,9631 -52,9450 " />
                                <polygon id="1" className="fil11" points="16531,9240 16531,9253 -48,9640 -48,9626 " />
                                <polygon id="2" className="fil12" points="16531,9249 16531,9262 -48,9649 -48,9635 " />
                                <polygon id="3" className="fil13" points="16531,9257 16531,9271 -47,9658 -48,9644 " />
                                <polygon id="4" className="fil14" points="16531,9266 16531,9280 -47,9666 -48,9653 " />
                                <polygon id="5" className="fil15" points="16531,9275 16532,9289 -47,9675 -47,9662 " />
                                <polygon id="6" className="fil16" points="16532,9284 16532,9297 -47,9684 -47,9671 " />
                                <polygon id="7" className="fil17" points="16532,9293 16532,9306 -47,9693 -47,9680 " />
                                <polygon id="8" className="fil18" points="16532,9302 16532,9315 -46,9702 -47,9689 " />
                                <polygon id="9" className="fil19" points="16532,9311 16533,9324 -46,9711 -47,9698 " />
                                <polygon id="10" className="fil20" points="16532,9320 16533,9333 -46,9720 -46,9706 " />
                                <polygon id="11" className="fil21" points="16533,9329 16533,9342 -46,9729 -46,9715 " />
                                <polygon id="12" className="fil22" points="16533,9337 16533,9351 -46,9738 -46,9724 " />
                                <polygon id="13" className="fil23" points="16533,9346 16533,9360 -45,9746 -46,9733 " />
                                <polygon id="14" className="fil24" points="16533,9355 16534,9369 -45,9755 -46,9742 " />
                                <polygon id="15" className="fil25" points="16533,9364 16534,9377 -45,9764 -45,9751 " />
                                <polygon id="16" className="fil26" points="16534,9373 16534,9386 -45,9773 -45,9760 " />
                                <polygon id="17" className="fil27" points="16534,9382 16534,9395 -45,9782 -45,9769 " />
                                <polygon id="18" className="fil28" points="16534,9391 16534,9404 -44,9791 -45,9778 " />
                                <polygon id="19" className="fil29" points="16534,9400 16535,9413 -44,9800 -44,9786 " />
                                <polygon id="20" className="fil30" points="16534,9409 16535,9422 -44,9809 -44,9795 " />
                                <polygon id="21" className="fil31" points="16535,9417 16535,9431 -44,9818 -44,9804 " />
                                <polygon id="22" className="fil32" points="16535,9426 16535,9440 -44,9826 -44,9813 " />
                                <polygon id="23" className="fil33" points="16535,9435 16535,9449 -43,9835 -44,9822 " />
                                <polygon id="24" className="fil33" points="16535,9444 16536,9457 -43,9844 -43,9831 " />
                                <polygon id="25" className="fil34" points="16536,9453 16536,9466 -43,9853 -43,9840 " />
                                <polygon id="26" className="fil35" points="16536,9462 16536,9475 -43,9862 -43,9849 " />
                                <polygon id="27" className="fil36" points="16536,9471 16536,9484 -43,9871 -43,9858 " />
                                <polygon id="28" className="fil37" points="16536,9480 16536,9493 -42,9880 -43,9866 " />
                                <polygon id="29" className="fil38" points="16536,9489 16537,9502 -42,9889 -42,9875 " />
                                <polygon id="30" className="fil38" points="16537,9497 16537,9511 -42,9898 -42,9884 " />
                                <polygon id="31" className="fil39" points="16537,9506 16537,9520 -42,9906 -42,9893 " />
                                <polygon id="32" className="fil40" points="16537,9515 16537,9529 -41,9915 -42,9902 " />
                                <polygon id="33" className="fil41" points="16537,9524 16538,9537 -41,9924 -42,9911 " />
                                <polygon id="34" className="fil42" points="16537,9533 16538,9546 -41,9933 -41,9920 " />
                                <polygon id="35" className="fil42" points="16538,9542 16538,9555 -41,9942 -41,9929 " />
                                <polygon id="36" className="fil43" points="16538,9551 16538,9564 -41,9951 -41,9938 " />
                                <polygon id="37" className="fil43" points="16538,9560 16538,9573 -40,9960 -41,9946 " />
                                <polygon id="38" className="fil44" points="16538,9569 16539,9582 -40,9969 -41,9955 " />
                                <polygon id="39" className="fil44" points="16538,9577 16539,9591 -40,9978 -40,9964 " />
                                <polygon id="40" className="fil45" points="16539,9586 16539,9600 -40,9986 -40,9973 " />
                                <polygon id="41" className="fil45" points="16539,9595 16539,9609 -40,9995 -40,9982 " />
                                <polygon id="42" className="fil46" points="16539,9604 16539,9617 -39,10004 -40,9991 " />
                                <polygon id="43" className="fil47" points="16539,9613 16540,9626 -39,10013 -39,10000 " />
                                <polygon id="44" className="fil48" points="16539,9622 16540,9635 -39,10022 -39,10009 " />
                                <polygon id="45" className="fil48" points="16540,9631 16540,9644 -39,10031 -39,10018 " />
                                <polygon id="46" className="fil49" points="16540,9640 16540,9653 -39,10040 -39,10026 " />
                                <polygon id="47" className="fil49" points="16540,9649 16540,9662 -38,10049 -39,10035 " />
                                <polygon id="48" className="fil49" points="16540,9657 16541,9671 -38,10058 -38,10044 " />
                                <polygon id="49" className="fil50" points="16541,9666 16541,9680 -38,10066 -38,10053 " />
                                <polygon id="50" className="fil50" points="16541,9675 16541,9689 -38,10075 -38,10062 " />
                                <polygon id="51" className="fil51" points="16541,9684 16541,9697 -38,10084 -38,10071 " />
                                <polygon id="52" className="fil52" points="16541,9693 16541,9706 -37,10093 -38,10080 " />
                                <polygon id="53" className="fil52" points="16541,9702 16542,9715 -37,10102 -37,10089 " />
                                <polygon id="54" className="fil53" points="16542,9711 16542,9724 -37,10111 -37,10098 " />
                                <polygon id="55" className="fil54" points="16542,9720 16542,9733 -37,10120 -37,10106 " />
                                <polygon id="56" className="fil55" points="16542,9729 16542,9742 -36,10129 -37,10115 " />
                                <polygon id="57" className="fil55" points="16542,9738 16542,9751 -36,10138 -37,10124 " />
                                <polygon id="58" className="fil55" points="16542,9746 16543,9760 -36,10146 -36,10133 " />
                                <polygon id="59" className="fil56" points="16543,9755 16543,9769 -36,10155 -36,10142 " />
                                <polygon id="60" className="fil56" points="16543,9764 16543,9778 -36,10164 -36,10151 " />
                                <polygon id="61" className="fil56" points="16543,9773 16543,9786 -35,10173 -36,10160 " />
                                <polygon id="62" className="fil57" points="16543,9782 16544,9795 -35,10182 -36,10169 " />
                                <polygon id="63" className="fil58" points="16543,9791 16544,9804 -35,10191 -35,10178 " />
                                <polygon id="64" className="fil58" points="16544,9800 16544,9813 -35,10200 -35,10186 " />
                                <polygon id="65" className="fil59" points="16544,9809 16544,9822 -35,10209 -35,10195 " />
                                <polygon id="66" className="fil59" points="16544,9818 16544,9831 -34,10218 -35,10204 " />
                                <polygon id="67" className="fil60" points="16544,9826 16545,9840 -34,10226 -35,10213 " />
                                <polygon id="68" className="fil61" points="16544,9835 16545,9849 -34,10235 -34,10222 " />
                                <polygon id="69" className="fil61" points="16545,9844 16545,9858 -34,10244 -34,10231 " />
                                <polygon id="70" className="fil61" points="16545,9853 16545,9866 -34,10253 -34,10240 " />
                                <polygon id="71" className="fil62" points="16545,9862 16545,9875 -33,10262 -34,10249 " />
                                <polygon id="72" className="fil63" points="16545,9871 16546,9884 -33,10271 -33,10258 " />
                                <polygon id="73" className="fil63" points="16545,9880 16546,9893 -33,10280 -33,10266 " />
                                <polygon id="74" className="fil63" points="16546,9889 16546,9902 -33,10289 -33,10275 " />
                                <polygon id="75" className="fil64" points="16546,9898 16546,9911 -33,10298 -33,10284 " />
                                <polygon id="76" className="fil65" points="16546,9906 16546,9920 -32,10306 -33,10293 " />
                                <polygon id="77" className="fil65" points="16546,9915 16547,9929 -32,10315 -32,10302 " />
                                <polygon id="78" className="fil65" points="16547,9924 16547,9938 -32,10324 -32,10311 " />
                                <polygon id="79" className="fil66" points="16547,9933 16547,9946 -32,10333 -32,10320 " />
                                <polygon id="80" className="fil66" points="16547,9942 16547,9955 -32,10342 -32,10329 " />
                                <polygon id="81" className="fil67" points="16547,9951 16547,9964 -31,10351 -32,10338 " />
                                <polygon id="82" className="fil67" points="16547,9960 16548,9973 -31,10360 -31,10346 " />
                                <polygon id="83" className="fil68" points="16548,9969 16548,9982 -31,10369 -31,10355 " />
                                <polygon id="84" className="fil68" points="16548,9978 16548,9991 -31,10378 -31,10364 " />
                                <polygon id="85" className="fil68" points="16548,9986 16548,10000 -30,10386 -31,10373 " />
                                <polygon id="86" className="fil69" points="16548,9995 16548,10009 -30,10395 -31,10382 " />
                                <polygon id="87" className="fil69" points="16548,10004 16549,10018 -30,10404 -30,10391 " />
                                <polygon id="88" className="fil70" points="16549,10013 16549,10026 -30,10413 -30,10400 " />
                                <polygon id="89" className="fil70" points="16549,10022 16549,10035 -30,10422 -30,10409 " />
                                <polygon id="90" className="fil70" points="16549,10031 16549,10044 -29,10431 -30,10418 " />
                                <polygon id="91" className="fil70" points="16549,10040 16550,10053 -29,10440 -30,10426 " />
                                <polygon id="92" className="fil71" points="16549,10049 16550,10062 -29,10449 -29,10435 " />
                                <polygon id="93" className="fil71" points="16550,10058 16550,10071 -29,10458 -29,10444 " />
                                <polygon id="94" className="fil71" points="16550,10066 16550,10080 -29,10466 -29,10453 " />
                                <polygon id="95" className="fil72" points="16550,10075 16550,10089 -28,10475 -29,10462 " />
                                <polygon id="96" className="fil72" points="16550,10084 16551,10098 -28,10484 -29,10471 " />
                                <polygon id="97" className="fil73" points="16550,10093 16551,10106 -28,10493 -28,10480 " />
                                <polygon id="98" className="fil74" points="16551,10102 16551,10115 -28,10502 -28,10489 " />
                                <polygon id="99" className="fil74" points="16551,10111 16551,10124 -28,10511 -28,10498 " />
                                <polygon id="100" className="fil74" points="16551,10120 16551,10133 -27,10520 -28,10506 " />
                                <polygon id="101" className="fil74" points="16551,10129 16552,10142 -27,10529 -27,10515 " />
                                <polygon id="102" className="fil75" points="16551,10138 16552,10151 -27,10538 -27,10524 " />
                                <polygon id="103" className="fil75" points="16552,10146 16552,10160 -27,10546 -27,10533 " />
                                <polygon id="104" className="fil76" points="16552,10155 16552,10169 -27,10555 -27,10542 " />
                                <polygon id="105" className="fil76" points="16552,10164 16552,10178 -26,10564 -27,10551 " />
                                <polygon id="106" className="fil76" points="16552,10173 16553,10186 -26,10573 -26,10560 " />
                                <polygon id="107" className="fil77" points="16553,10182 16553,10195 -26,10582 -26,10569 " />
                                <polygon id="108" className="fil77" points="16553,10191 16553,10204 -26,10591 -26,10578 " />
                                <polygon id="109" className="fil77" points="16553,10200 16553,10213 -25,10600 -26,10586 " />
                                <polygon id="110" className="fil78" points="16553,10209 16553,10222 -25,10609 -26,10595 " />
                                <polygon id="111" className="fil78" points="16553,10218 16554,10231 -25,10618 -25,10604 " />
                                <polygon id="112" className="fil79" points="16554,10226 16554,10240 -25,10626 -25,10613 " />
                                <polygon id="113" className="fil79" points="16554,10235 16554,10249 -25,10635 -25,10622 " />
                                <polygon id="114" className="fil79" points="16554,10244 16554,10258 -24,10644 -25,10631 " />
                                <polygon id="115" className="fil79" points="16554,10253 16555,10266 -24,10653 -25,10640 " />
                                <polygon id="116" className="fil80" points="16554,10262 16555,10275 -24,10662 -24,10649 " />
                                <polygon id="117" className="fil80" points="16555,10271 16555,10284 -24,10671 -24,10658 " />
                                <polygon id="118" className="fil80" points="16555,10280 16555,10293 -24,10680 -24,10666 " />
                                <polygon id="119" className="fil80" points="16555,10289 16555,10302 -23,10689 -24,10675 " />
                                <polygon id="120" className="fil80" points="16555,10298 16556,10311 -23,10698 -24,10684 " />
                                <polygon id="121" className="fil81" points="16555,10306 16556,10320 -23,10706 -23,10693 " />
                                <polygon id="122" className="fil82" points="16556,10315 16556,10329 -23,10715 -23,10702 " />
                                <polygon id="123" className="fil82" points="16556,10324 16556,10338 -23,10724 -23,10711 " />
                                <polygon id="124" className="fil82" points="16556,10333 16556,10346 -22,10733 -23,10720 " />
                                <polygon id="125" className="fil83" points="16556,10342 16557,10355 -22,10742 -22,10729 " />
                                <polygon id="126" className="fil83" points="16556,10351 16557,10364 -22,10751 -22,10738 " />
                                <polygon id="127" className="fil84" points="16557,10360 16557,10373 -22,10760 -22,10746 " />
                                <polygon id="128" className="fil84" points="16557,10369 16557,10382 -22,10769 -22,10755 " />
                                <polygon id="129" className="fil85" points="16557,10378 16557,10391 -21,10778 -22,10764 " />
                                <polygon id="130" className="fil85" points="16557,10386 16558,10400 -21,10786 -21,10773 " />
                                <polygon id="131" className="fil85" points="16558,10395 16558,10409 -21,10795 -21,10782 " />
                                <polygon id="132" className="fil86" points="16558,10404 16558,10418 -21,10804 -21,10791 " />
                                <polygon id="133" className="fil87" points="16558,10413 16558,10426 -21,10813 -21,10800 " />
                                <polygon id="134" className="fil87" points="16558,10422 16558,10435 -20,10822 -21,10809 " />
                                <polygon id="135" className="fil87" points="16558,10431 16559,10444 -20,10831 -20,10818 " />
                                <polygon id="136" className="fil87" points="16559,10440 16559,10453 -20,10840 -20,10826 " />
                                <polygon id="137" className="fil88" points="16559,10449 16559,10462 -20,10849 -20,10835 " />
                                <polygon id="138" className="fil89" points="16559,10458 16559,10471 -19,10858 -20,10844 " />
                                <polygon id="139" className="fil89" points="16559,10466 16559,10480 -19,10866 -20,10853 " />
                                <polygon id="140" className="fil89" points="16559,10475 16560,10489 -19,10875 -19,10862 " />
                                <polygon id="141" className="fil90" points="16560,10484 16560,10498 -19,10884 -19,10871 " />
                                <polygon id="142" className="fil90" points="16560,10493 16560,10506 -19,10893 -19,10880 " />
                                <polygon id="143" className="fil91" points="16560,10502 16560,10515 -18,10902 -19,10889 " />
                                <polygon id="144" className="fil91" points="16560,10511 16561,10524 -18,10911 -19,10898 " />
                                <polygon id="145" className="fil92" points="16560,10520 16561,10533 -18,10920 -18,10906 " />
                                <polygon id="146" className="fil92" points="16561,10529 16561,10542 -18,10929 -18,10915 " />
                                <polygon id="147" className="fil92" points="16561,10538 16561,10551 -18,10938 -18,10924 " />
                                <polygon id="148" className="fil93" points="16561,10546 16561,10560 -17,10946 -18,10933 " />
                                <polygon id="149" className="fil94" points="16561,10555 16562,10569 -17,10955 -18,10942 " />
                                <polygon id="150" className="fil94" points="16561,10564 16562,10578 -17,10964 -17,10951 " />
                                <polygon id="151" className="fil94" points="16562,10573 16562,10586 -17,10973 -17,10960 " />
                                <polygon id="152" className="fil95" points="16562,10582 16562,10595 -17,10982 -17,10969 " />
                                <polygon id="153" className="fil96" points="16562,10591 16562,10604 -16,10991 -17,10978 " />
                                <polygon id="154" className="fil96" points="16562,10600 16563,10613 -16,11000 -16,10986 " />
                                <polygon id="155" className="fil96" points="16562,10609 16563,10622 -16,11009 -16,10995 " />
                                <polygon id="156" className="fil96" points="16563,10618 16563,10631 -16,11018 -16,11004 " />
                                <polygon id="157" className="fil97" points="16563,10626 16563,10640 -16,11026 -16,11013 " />
                                <polygon id="158" className="fil97" points="16563,10635 16563,10649 -15,11035 -16,11022 " />
                                <polygon id="159" className="fil97" points="16563,10644 16564,10658 -15,11044 -15,11031 " />
                                <polygon id="160" className="fil98" points="16564,10653 16564,10666 -15,11053 -15,11040 " />
                                <polygon id="161" className="fil98" points="16564,10662 16564,10675 -15,11062 -15,11049 " />
                                <polygon id="162" className="fil99" points="16564,10671 16564,10684 -15,11071 -15,11058 " />
                                <polygon id="163" className="fil99" points="16564,10680 16564,10693 -14,11080 -15,11066 " />
                                <polygon id="164" className="fil100" points="16564,10689 16565,10702 -14,11089 -14,11075 " />
                                <polygon id="165" className="fil100" points="16565,10698 16565,10711 -14,11098 -14,11084 " />
                                <polygon id="166" className="fil101" points="16565,10706 16565,10720 -14,11106 -14,11093 " />
                                <polygon id="167" className="fil102" points="16565,10715 16565,10729 -13,11115 -14,11102 " />
                                <polygon id="168" className="fil102" points="16565,10724 16565,10738 -13,11124 -14,11111 " />
                                <polygon id="169" className="fil102" points="16565,10733 16566,10746 -13,11133 -13,11120 " />
                                <polygon id="170" className="fil102" points="16566,10742 16566,10755 -13,11142 -13,11129 " />
                                <polygon id="171" className="fil103" points="16566,10751 16566,10764 -13,11151 -13,11138 " />
                                <polygon id="172" className="fil103" points="16566,10760 16566,10773 -12,11160 -13,11146 " />
                                <polygon id="173" className="fil103" points="16566,10769 16567,10782 -12,11169 -13,11155 " />
                                <polygon id="174" className="fil104" points="16566,10778 16567,10791 -12,11178 -12,11164 " />
                                <polygon id="175" className="fil105" points="16567,10786 16567,10800 -12,11186 -12,11173 " />
                                <polygon id="176" className="fil105" points="16567,10795 16567,10809 -12,11195 -12,11182 " />
                                <polygon id="177" className="fil106" points="16567,10804 16567,10818 -11,11204 -12,11191 " />
                                <polygon id="178" className="fil106" points="16567,10813 16568,10826 -11,11213 -12,11200 " />
                                <polygon id="179" className="fil107" points="16567,10822 16568,10835 -11,11222 -11,11209 " />
                                <polygon id="180" className="fil107" points="16568,10831 16568,10844 -11,11231 -11,11218 " />
                                <polygon id="181" className="fil108" points="16568,10840 16568,10853 -11,11240 -11,11227 " />
                                <polygon id="182" className="fil108" points="16568,10849 16568,10862 -10,11249 -11,11235 " />
                                <polygon id="183" className="fil109" points="16568,10858 16569,10871 -10,11258 -10,11244 " />
                                <polygon id="184" className="fil110" points="16569,10866 16569,10880 -10,11267 -10,11253 " />
                                <polygon id="185" className="fil110" points="16569,10875 16569,10889 -10,11275 -10,11262 " />
                                <polygon id="186" className="fil110" points="16569,10884 16569,10898 -10,11284 -10,11271 " />
                                <polygon id="187" className="fil111" points="16569,10893 16569,10906 -9,11293 -10,11280 " />
                                <polygon id="188" className="fil111" points="16569,10902 16570,10915 -9,11302 -9,11289 " />
                                <polygon id="189" className="fil111" points="16570,10911 16570,10924 -9,11311 -9,11298 " />
                                <polygon id="190" className="fil112" points="16570,10920 16570,10933 -9,11320 -9,11307 " />
                                <polygon id="191" className="fil113" points="16570,10929 16570,10942 -8,11329 -9,11315 " />
                                <polygon id="192" className="fil113" points="16570,10938 16570,10951 -8,11338 -9,11324 " />
                                <polygon id="193" className="fil114" points="16570,10946 16571,10960 -8,11347 -8,11333 " />
                                <polygon id="194" className="fil114" points="16571,10955 16571,10969 -8,11355 -8,11342 " />
                                <polygon id="195" className="fil115" points="16571,10964 16571,10978 -8,11364 -8,11351 " />
                                <polygon id="196" className="fil116" points="16571,10973 16571,10986 -7,11373 -8,11360 " />
                                <polygon id="197" className="fil116" points="16571,10982 16572,10995 -7,11382 -8,11369 " />
                                <polygon id="198" className="fil116" points="16571,10991 16572,11004 -7,11391 -7,11378 " />
                                <polygon id="199" className="fil117" points="16572,11000 16572,11013 -7,11400 -7,11387 " />
                                <polygon id="200" className="fil117" points="16572,11009 16572,11022 -7,11409 -7,11395 " />
                                <polygon id="201" className="fil117" points="16572,11018 16572,11031 -6,11418 -7,11404 " />
                                <polygon id="202" className="fil118" points="16572,11026 16573,11040 -6,11427 -7,11413 " />
                                <polygon id="203" className="fil118" points="16572,11035 16573,11049 -6,11435 -6,11422 " />
                                <polygon id="204" className="fil118" points="16573,11044 16573,11058 -6,11444 -6,11431 " />
                                <polygon id="205" className="fil119" points="16573,11053 16573,11066 -6,11453 -6,11440 " />
                                <polygon id="206" className="fil120" points="16573,11062 16573,11075 -5,11462 -6,11449 " />
                                <polygon id="207" className="fil121" points="16573,11071 16574,11084 -5,11471 -5,11458 " />
                                <polygon id="208" className="fil121" points="16573,11080 16574,11093 -5,11480 -5,11467 " />
                                <polygon id="209" className="fil122" points="16574,11089 16574,11102 -5,11489 -5,11475 " />
                                <polygon id="210" className="fil123" points="16574,11098 16574,11111 -5,11498 -5,11484 " />
                                <polygon id="211" className="fil123" points="16574,11106 16574,11120 -4,11507 -5,11493 " />
                                <polygon id="212" className="fil123" points="16574,11115 16575,11129 -4,11515 -4,11502 " />
                                <polygon id="213" className="fil124" points="16575,11124 16575,11138 -4,11524 -4,11511 " />
                                <polygon id="214" className="fil124" points="16575,11133 16575,11146 -4,11533 -4,11520 " />
                                <polygon id="215" className="fil125" points="16575,11142 16575,11155 -4,11542 -4,11529 " />
                                <polygon id="216" className="fil126" points="16575,11151 16575,11164 -3,11551 -4,11538 " />
                                <polygon id="217" className="fil126" points="16575,11160 16576,11173 -3,11560 -3,11547 " />
                                <polygon id="218" className="fil127" points="16576,11169 16576,11182 -3,11569 -3,11555 " />
                                <polygon id="219" className="fil128" points="16576,11178 16576,11191 -3,11578 -3,11564 " />
                                <polygon id="220" className="fil128" points="16576,11186 16576,11200 -2,11587 -3,11573 " />
                                <polygon id="221" className="fil129" points="16576,11195 16576,11209 -2,11595 -3,11582 " />
                                <polygon id="222" className="fil129" points="16576,11204 16577,11218 -2,11604 -2,11591 " />
                                <polygon id="223" className="fil130" points="16577,11213 16577,11226 -2,11613 -2,11600 " />
                                <polygon id="224" className="fil130" points="16577,11222 16577,11235 -2,11622 -2,11609 " />
                                <polygon id="225" className="fil130" points="16577,11231 16577,11244 -1,11631 -2,11618 " />
                                <polygon id="226" className="fil131" points="16577,11240 16578,11253 -1,11640 -2,11627 " />
                                <polygon id="227" className="fil131" points="16577,11249 16578,11262 -1,11649 -1,11635 " />
                                <polygon id="228" className="fil132" points="16578,11258 16578,11271 -1,11658 -1,11644 " />
                                <polygon id="229" className="fil133" points="16578,11266 16578,11280 -1,11667 -1,11653 " />
                                <polygon id="230" className="fil134" points="16578,11275 16578,11289 0,11675 -1,11662 " />
                                <polygon id="231" className="fil134" points="16578,11284 16579,11298 0,11684 -1,11671 " />
                                <polygon id="232" className="fil135" points="16578,11293 16579,11306 0,11693 0,11680 " />
                                <polygon id="233" className="fil136" points="16579,11302 16579,11315 0,11702 0,11689 " />
                                <polygon id="234" className="fil136" points="16579,11311 16579,11324 0,11711 0,11698 " />
                                <polygon id="235" className="fil137" points="16579,11320 16579,11333 1,11720 0,11707 " />
                                <polygon id="236" className="fil137" points="16579,11329 16580,11342 1,11729 1,11715 " />
                                <polygon id="237" className="fil138" points="16579,11338 16580,11351 1,11738 1,11724 " />
                                <polygon id="238" className="fil139" points="16580,11346 16580,11360 1,11747 1,11733 " />
                                <polygon id="239" className="fil139" points="16580,11355 16580,11369 1,11755 1,11742 " />
                                <polygon id="240" className="fil140" points="16580,11364 16580,11378 2,11764 1,11751 " />
                                <polygon id="241" className="fil141" points="16580,11373 16581,11386 2,11773 2,11760 " />
                                <polygon id="242" className="fil142" points="16581,11382 16581,11395 2,11782 2,11769 " />
                                <polygon id="243" className="fil142" points="16581,11391 16581,11404 2,11791 2,11778 " />
                                <polygon id="244" className="fil143" points="16581,11400 16581,11413 2,11800 2,11787 " />
                                <polygon id="245" className="fil143" points="16581,11409 16581,11422 3,11809 2,11795 " />
                                <polygon id="246" className="fil144" points="16581,11418 16582,11431 3,11818 3,11804 " />
                                <polygon id="247" className="fil144" points="16582,11427 16582,11440 3,11827 3,11813 " />
                                <polygon id="248" className="fil145" points="16582,11435 16582,11449 3,11835 3,11822 " />
                                <polygon id="249" className="fil146" points="16582,11444 16582,11458 4,11844 3,11831 " />
                                <polygon id="250" className="fil147" points="16582,11453 16582,11467 4,11853 3,11840 " />
                                <polygon id="251" className="fil147" points="16582,11462 16583,11475 4,11862 4,11849 " />
                                <polygon id="252" className="fil148" points="16583,11471 16583,11484 4,11871 4,11858 " />
                                <polygon id="253" className="fil148" points="16583,11480 16583,11493 4,11880 4,11867 " />
                                <polygon id="254" className="fil149" points="16583,11489 16583,11502 5,11889 4,11875 " />
                                <polygon id="255" className="fil149" points="16583,11498 16588,11692 9,12078 4,11884 " />
                            </g>
                        </g>
                        <g>
                            <g style={{ clipPath: "url(#id2)" }}>
                                <polygon className="fil150" points="16531,10834 16531,10852 -6,10984 -6,10966 " />
                                <polygon id="1" className="fil151" points="16531,10850 16531,10855 -6,10987 -6,10983 " />
                                <polygon id="2" className="fil152" points="16531,10854 16531,10858 -6,10991 -6,10986 " />
                                <polygon id="3" className="fil153" points="16531,10857 16531,10861 -6,10994 -6,10989 " />
                                <polygon id="4" className="fil154" points="16531,10860 16531,10864 -6,10997 -6,10992 " />
                                <polygon id="5" className="fil155" points="16531,10863 16531,10867 -6,11000 -6,10995 " />
                                <polygon id="6" className="fil156" points="16531,10866 16531,10870 -6,11003 -6,10998 " />
                                <polygon id="7" className="fil157" points="16531,10869 16531,10873 -6,11006 -6,11001 " />
                                <polygon id="8" className="fil158" points="16531,10872 16531,10876 -5,11009 -6,11004 " />
                                <polygon id="9" className="fil159" points="16531,10875 16531,10879 -5,11012 -5,11007 " />
                                <polygon id="10" className="fil160" points="16531,10878 16531,10883 -5,11015 -5,11010 " />
                                <polygon id="11" className="fil161" points="16531,10881 16531,10886 -5,11018 -5,11013 " />
                                <polygon id="12" className="fil162" points="16531,10884 16531,10889 -5,11021 -5,11017 " />
                                <polygon id="13" className="fil163" points="16531,10887 16531,10892 -5,11024 -5,11020 " />
                                <polygon id="14" className="fil164" points="16531,10890 16532,10895 -5,11027 -5,11023 " />
                                <polygon id="15" className="fil164" points="16532,10893 16532,10898 -5,11030 -5,11026 " />
                                <polygon id="16" className="fil165" points="16532,10896 16532,10901 -5,11033 -5,11029 " />
                                <polygon id="17" className="fil166" points="16532,10899 16532,10904 -5,11036 -5,11032 " />
                                <polygon id="18" className="fil166" points="16532,10902 16532,10907 -5,11039 -5,11035 " />
                                <polygon id="19" className="fil167" points="16532,10905 16532,10910 -5,11042 -5,11038 " />
                                <polygon id="20" className="fil168" points="16532,10908 16532,10913 -5,11046 -5,11041 " />
                                <polygon id="21" className="fil169" points="16532,10912 16532,10916 -5,11049 -5,11044 " />
                                <polygon id="22" className="fil170" points="16532,10915 16532,10919 -5,11052 -5,11047 " />
                                <polygon id="23" className="fil171" points="16532,10918 16532,10922 -5,11055 -5,11050 " />
                                <polygon id="24" className="fil172" points="16532,10921 16532,10925 -5,11058 -5,11053 " />
                                <polygon id="25" className="fil172" points="16532,10924 16532,10928 -5,11061 -5,11056 " />
                                <polygon id="26" className="fil173" points="16532,10927 16532,10931 -5,11064 -5,11059 " />
                                <polygon id="27" className="fil174" points="16532,10930 16532,10934 -5,11067 -5,11062 " />
                                <polygon id="28" className="fil175" points="16532,10933 16532,10938 -5,11070 -5,11065 " />
                                <polygon id="29" className="fil176" points="16532,10936 16532,10941 -5,11073 -5,11068 " />
                                <polygon id="30" className="fil177" points="16532,10939 16532,10944 -5,11076 -5,11071 " />
                                <polygon id="31" className="fil177" points="16532,10942 16532,10947 -5,11079 -5,11075 " />
                                <polygon id="32" className="fil178" points="16532,10945 16532,10950 -5,11082 -5,11078 " />
                                <polygon id="33" className="fil179" points="16532,10948 16532,10953 -5,11085 -5,11081 " />
                                <polygon id="34" className="fil180" points="16532,10951 16532,10956 -5,11088 -5,11084 " />
                                <polygon id="35" className="fil180" points="16532,10954 16532,10959 -5,11091 -5,11087 " />
                                <polygon id="36" className="fil181" points="16532,10957 16532,10962 -5,11094 -5,11090 " />
                                <polygon id="37" className="fil181" points="16532,10960 16532,10965 -5,11097 -5,11093 " />
                                <polygon id="38" className="fil181" points="16532,10963 16532,10968 -5,11101 -5,11096 " />
                                <polygon id="39" className="fil182" points="16532,10967 16532,10971 -5,11104 -5,11099 " />
                                <polygon id="40" className="fil182" points="16532,10970 16532,10974 -5,11107 -5,11102 " />
                                <polygon id="41" className="fil183" points="16532,10973 16532,10977 -5,11110 -5,11105 " />
                                <polygon id="42" className="fil183" points="16532,10976 16532,10980 -5,11113 -5,11108 " />
                                <polygon id="43" className="fil184" points="16532,10979 16532,10983 -5,11116 -5,11111 " />
                                <polygon id="44" className="fil185" points="16532,10982 16532,10986 -5,11119 -5,11114 " />
                                <polygon id="45" className="fil185" points="16532,10985 16532,10989 -5,11122 -5,11117 " />
                                <polygon id="46" className="fil186" points="16532,10988 16532,10992 -5,11125 -5,11120 " />
                                <polygon id="47" className="fil187" points="16532,10991 16532,10996 -5,11128 -5,11123 " />
                                <polygon id="48" className="fil187" points="16532,10994 16532,10999 -5,11131 -5,11126 " />
                                <polygon id="49" className="fil187" points="16532,10997 16532,11002 -4,11134 -5,11130 " />
                                <polygon id="50" className="fil188" points="16532,11000 16532,11005 -4,11137 -4,11133 " />
                                <polygon id="51" className="fil188" points="16532,11003 16532,11008 -4,11140 -4,11136 " />
                                <polygon id="52" className="fil188" points="16532,11006 16532,11011 -4,11143 -4,11139 " />
                                <polygon id="53" className="fil188" points="16532,11009 16532,11014 -4,11146 -4,11142 " />
                                <polygon id="54" className="fil189" points="16532,11012 16532,11017 -4,11149 -4,11145 " />
                                <polygon id="55" className="fil190" points="16532,11015 16533,11020 -4,11152 -4,11148 " />
                                <polygon id="56" className="fil190" points="16533,11018 16533,11023 -4,11155 -4,11151 " />
                                <polygon id="57" className="fil190" points="16533,11021 16533,11026 -4,11159 -4,11154 " />
                                <polygon id="58" className="fil191" points="16533,11025 16533,11029 -4,11162 -4,11157 " />
                                <polygon id="59" className="fil192" points="16533,11028 16533,11032 -4,11165 -4,11160 " />
                                <polygon id="60" className="fil192" points="16533,11031 16533,11035 -4,11168 -4,11163 " />
                                <polygon id="61" className="fil192" points="16533,11034 16533,11038 -4,11171 -4,11166 " />
                                <polygon id="62" className="fil193" points="16533,11037 16533,11041 -4,11174 -4,11169 " />
                                <polygon id="63" className="fil193" points="16533,11040 16533,11044 -4,11177 -4,11172 " />
                                <polygon id="64" className="fil194" points="16533,11043 16533,11047 -4,11180 -4,11175 " />
                                <polygon id="65" className="fil194" points="16533,11046 16533,11051 -4,11183 -4,11178 " />
                                <polygon id="66" className="fil195" points="16533,11049 16533,11054 -4,11186 -4,11181 " />
                                <polygon id="67" className="fil195" points="16533,11052 16533,11057 -4,11189 -4,11184 " />
                                <polygon id="68" className="fil195" points="16533,11055 16533,11060 -4,11192 -4,11188 " />
                                <polygon id="69" className="fil195" points="16533,11058 16533,11063 -4,11195 -4,11191 " />
                                <polygon id="70" className="fil196" points="16533,11061 16533,11066 -4,11198 -4,11194 " />
                                <polygon id="71" className="fil197" points="16533,11064 16533,11069 -4,11201 -4,11197 " />
                                <polygon id="72" className="fil197" points="16533,11067 16533,11072 -4,11204 -4,11200 " />
                                <polygon id="73" className="fil197" points="16533,11070 16533,11075 -4,11207 -4,11203 " />
                                <polygon id="74" className="fil197" points="16533,11073 16533,11078 -4,11210 -4,11206 " />
                                <polygon id="75" className="fil197" points="16533,11076 16533,11081 -4,11214 -4,11209 " />
                                <polygon id="76" className="fil198" points="16533,11080 16533,11084 -4,11217 -4,11212 " />
                                <polygon id="77" className="fil198" points="16533,11083 16533,11087 -4,11220 -4,11215 " />
                                <polygon id="78" className="fil198" points="16533,11086 16533,11090 -4,11223 -4,11218 " />
                                <polygon id="79" className="fil198" points="16533,11089 16533,11093 -4,11226 -4,11221 " />
                                <polygon id="80" className="fil198" points="16533,11092 16533,11096 -4,11229 -4,11224 " />
                                <polygon id="81" className="fil199" points="16533,11095 16533,11099 -4,11232 -4,11227 " />
                                <polygon id="82" className="fil199" points="16533,11098 16533,11102 -4,11235 -4,11230 " />
                                <polygon id="83" className="fil200" points="16533,11101 16533,11105 -4,11238 -4,11233 " />
                                <polygon id="84" className="fil200" points="16533,11104 16533,11109 -4,11241 -4,11236 " />
                                <polygon id="85" className="fil200" points="16533,11107 16533,11112 -4,11244 -4,11239 " />
                                <polygon id="86" className="fil200" points="16533,11110 16533,11115 -4,11247 -4,11243 " />
                                <polygon id="87" className="fil201" points="16533,11113 16533,11118 -4,11250 -4,11246 " />
                                <polygon id="88" className="fil201" points="16533,11116 16533,11121 -4,11253 -4,11249 " />
                                <polygon id="89" className="fil201" points="16533,11119 16533,11124 -3,11256 -4,11252 " />
                                <polygon id="90" className="fil201" points="16533,11122 16533,11127 -3,11259 -4,11255 " />
                                <polygon id="91" className="fil202" points="16533,11125 16533,11130 -3,11262 -3,11258 " />
                                <polygon id="92" className="fil202" points="16533,11128 16533,11133 -3,11265 -3,11261 " />
                                <polygon id="93" className="fil203" points="16533,11131 16533,11136 -3,11268 -3,11264 " />
                                <polygon id="94" className="fil203" points="16533,11134 16533,11139 -3,11272 -3,11267 " />
                                <polygon id="95" className="fil203" points="16533,11138 16534,11142 -3,11275 -3,11270 " />
                                <polygon id="96" className="fil203" points="16533,11141 16534,11145 -3,11278 -3,11273 " />
                                <polygon id="97" className="fil203" points="16534,11144 16534,11148 -3,11281 -3,11276 " />
                                <polygon id="98" className="fil203" points="16534,11147 16534,11151 -3,11284 -3,11279 " />
                                <polygon id="99" className="fil204" points="16534,11150 16534,11154 -3,11287 -3,11282 " />
                                <polygon id="100" className="fil205" points="16534,11153 16534,11157 -3,11290 -3,11285 " />
                                <polygon id="101" className="fil205" points="16534,11156 16534,11160 -3,11293 -3,11288 " />
                                <polygon id="102" className="fil205" points="16534,11159 16534,11164 -3,11296 -3,11291 " />
                                <polygon id="103" className="fil205" points="16534,11162 16534,11167 -3,11299 -3,11294 " />
                                <polygon id="104" className="fil205" points="16534,11165 16534,11170 -3,11302 -3,11297 " />
                                <polygon id="105" className="fil205" points="16534,11168 16534,11173 -3,11305 -3,11301 " />
                                <polygon id="106" className="fil206" points="16534,11171 16534,11176 -3,11308 -3,11304 " />
                                <polygon id="107" className="fil206" points="16534,11174 16534,11179 -3,11311 -3,11307 " />
                                <polygon id="108" className="fil206" points="16534,11177 16534,11182 -3,11314 -3,11310 " />
                                <polygon id="109" className="fil206" points="16534,11180 16534,11185 -3,11317 -3,11313 " />
                                <polygon id="110" className="fil206" points="16534,11183 16534,11188 -3,11320 -3,11316 " />
                                <polygon id="111" className="fil207" points="16534,11186 16534,11191 -3,11323 -3,11319 " />
                                <polygon id="112" className="fil207" points="16534,11189 16534,11194 -3,11327 -3,11322 " />
                                <polygon id="113" className="fil208" points="16534,11193 16534,11197 -3,11330 -3,11325 " />
                                <polygon id="114" className="fil208" points="16534,11196 16534,11200 -3,11333 -3,11328 " />
                                <polygon id="115" className="fil208" points="16534,11199 16534,11203 -3,11336 -3,11331 " />
                                <polygon id="116" className="fil208" points="16534,11202 16534,11206 -3,11339 -3,11334 " />
                                <polygon id="117" className="fil209" points="16534,11205 16534,11209 -3,11342 -3,11337 " />
                                <polygon id="118" className="fil209" points="16534,11208 16534,11212 -3,11345 -3,11340 " />
                                <polygon id="119" className="fil209" points="16534,11211 16534,11215 -3,11348 -3,11343 " />
                                <polygon id="120" className="fil210" points="16534,11214 16534,11218 -3,11351 -3,11346 " />
                                <polygon id="121" className="fil210" points="16534,11217 16534,11222 -3,11354 -3,11349 " />
                                <polygon id="122" className="fil210" points="16534,11220 16534,11225 -3,11357 -3,11352 " />
                                <polygon id="123" className="fil211" points="16534,11223 16534,11228 -3,11360 -3,11356 " />
                                <polygon id="124" className="fil211" points="16534,11226 16534,11231 -3,11363 -3,11359 " />
                                <polygon id="125" className="fil211" points="16534,11229 16534,11234 -3,11366 -3,11362 " />
                                <polygon id="126" className="fil211" points="16534,11232 16534,11237 -3,11369 -3,11365 " />
                                <polygon id="127" className="fil212" points="16534,11235 16534,11240 -3,11372 -3,11368 " />
                                <polygon id="128" className="fil213" points="16534,11238 16534,11243 -3,11375 -3,11371 " />
                                <polygon id="129" className="fil213" points="16534,11241 16534,11246 -3,11378 -3,11374 " />
                                <polygon id="130" className="fil213" points="16534,11244 16534,11249 -2,11381 -3,11377 " />
                                <polygon id="131" className="fil213" points="16534,11247 16534,11252 -2,11385 -3,11380 " />
                                <polygon id="132" className="fil213" points="16534,11251 16534,11255 -2,11388 -2,11383 " />
                                <polygon id="133" className="fil214" points="16534,11254 16534,11258 -2,11391 -2,11386 " />
                                <polygon id="134" className="fil215" points="16534,11257 16534,11261 -2,11394 -2,11389 " />
                                <polygon id="135" className="fil215" points="16534,11260 16534,11264 -2,11397 -2,11392 " />
                                <polygon id="136" className="fil215" points="16534,11263 16535,11267 -2,11400 -2,11395 " />
                                <polygon id="137" className="fil215" points="16534,11266 16535,11270 -2,11403 -2,11398 " />
                                <polygon id="138" className="fil215" points="16535,11269 16535,11273 -2,11406 -2,11401 " />
                                <polygon id="139" className="fil216" points="16535,11272 16535,11277 -2,11409 -2,11404 " />
                                <polygon id="140" className="fil217" points="16535,11275 16535,11280 -2,11412 -2,11407 " />
                                <polygon id="141" className="fil217" points="16535,11278 16535,11283 -2,11415 -2,11411 " />
                                <polygon id="142" className="fil217" points="16535,11281 16535,11286 -2,11418 -2,11414 " />
                                <polygon id="143" className="fil217" points="16535,11284 16535,11289 -2,11421 -2,11417 " />
                                <polygon id="144" className="fil218" points="16535,11287 16535,11292 -2,11424 -2,11420 " />
                                <polygon id="145" className="fil218" points="16535,11290 16535,11295 -2,11427 -2,11423 " />
                                <polygon id="146" className="fil218" points="16535,11293 16535,11298 -2,11430 -2,11426 " />
                                <polygon id="147" className="fil219" points="16535,11296 16535,11301 -2,11433 -2,11429 " />
                                <polygon id="148" className="fil219" points="16535,11299 16535,11304 -2,11436 -2,11432 " />
                                <polygon id="149" className="fil220" points="16535,11302 16535,11307 -2,11440 -2,11435 " />
                                <polygon id="150" className="fil220" points="16535,11306 16535,11310 -2,11443 -2,11438 " />
                                <polygon id="151" className="fil220" points="16535,11309 16535,11313 -2,11446 -2,11441 " />
                                <polygon id="152" className="fil220" points="16535,11312 16535,11316 -2,11449 -2,11444 " />
                                <polygon id="153" className="fil221" points="16535,11315 16535,11319 -2,11452 -2,11447 " />
                                <polygon id="154" className="fil222" points="16535,11318 16535,11322 -2,11455 -2,11450 " />
                                <polygon id="155" className="fil222" points="16535,11321 16535,11325 -2,11458 -2,11453 " />
                                <polygon id="156" className="fil222" points="16535,11324 16535,11328 -2,11461 -2,11456 " />
                                <polygon id="157" className="fil222" points="16535,11327 16535,11331 -2,11464 -2,11459 " />
                                <polygon id="158" className="fil222" points="16535,11330 16535,11335 -2,11467 -2,11462 " />
                                <polygon id="159" className="fil223" points="16535,11333 16535,11338 -2,11470 -2,11465 " />
                                <polygon id="160" className="fil223" points="16535,11336 16535,11341 -2,11473 -2,11469 " />
                                <polygon id="161" className="fil223" points="16535,11339 16535,11344 -2,11476 -2,11472 " />
                                <polygon id="162" className="fil223" points="16535,11342 16535,11347 -2,11479 -2,11475 " />
                                <polygon id="163" className="fil224" points="16535,11345 16535,11350 -2,11482 -2,11478 " />
                                <polygon id="164" className="fil224" points="16535,11348 16535,11353 -2,11485 -2,11481 " />
                                <polygon id="165" className="fil225" points="16535,11351 16535,11356 -2,11488 -2,11484 " />
                                <polygon id="166" className="fil225" points="16535,11354 16535,11359 -2,11491 -2,11487 " />
                                <polygon id="167" className="fil225" points="16535,11357 16535,11362 -2,11494 -2,11490 " />
                                <polygon id="168" className="fil226" points="16535,11361 16535,11365 -2,11498 -2,11493 " />
                                <polygon id="169" className="fil226" points="16535,11364 16535,11368 -2,11501 -2,11496 " />
                                <polygon id="170" className="fil227" points="16535,11367 16535,11371 -2,11504 -2,11499 " />
                                <polygon id="171" className="fil227" points="16535,11370 16535,11374 -1,11507 -2,11502 " />
                                <polygon id="172" className="fil228" points="16535,11373 16535,11377 -1,11510 -2,11505 " />
                                <polygon id="173" className="fil228" points="16535,11376 16535,11380 -1,11513 -1,11508 " />
                                <polygon id="174" className="fil228" points="16535,11379 16535,11383 -1,11516 -1,11511 " />
                                <polygon id="175" className="fil228" points="16535,11382 16535,11386 -1,11519 -1,11514 " />
                                <polygon id="176" className="fil229" points="16535,11385 16535,11390 -1,11522 -1,11517 " />
                                <polygon id="177" className="fil230" points="16535,11388 16536,11393 -1,11525 -1,11520 " />
                                <polygon id="178" className="fil230" points="16535,11391 16536,11396 -1,11528 -1,11524 " />
                                <polygon id="179" className="fil230" points="16536,11394 16536,11399 -1,11531 -1,11527 " />
                                <polygon id="180" className="fil230" points="16536,11397 16536,11402 -1,11534 -1,11530 " />
                                <polygon id="181" className="fil231" points="16536,11400 16536,11405 -1,11537 -1,11533 " />
                                <polygon id="182" className="fil231" points="16536,11403 16536,11408 -1,11540 -1,11536 " />
                                <polygon id="183" className="fil231" points="16536,11406 16536,11411 -1,11543 -1,11539 " />
                                <polygon id="184" className="fil231" points="16536,11409 16536,11414 -1,11546 -1,11542 " />
                                <polygon id="185" className="fil231" points="16536,11412 16536,11417 -1,11549 -1,11545 " />
                                <polygon id="186" className="fil232" points="16536,11415 16536,11420 -1,11553 -1,11548 " />
                                <polygon id="187" className="fil233" points="16536,11419 16536,11423 -1,11556 -1,11551 " />
                                <polygon id="188" className="fil233" points="16536,11422 16536,11426 -1,11559 -1,11554 " />
                                <polygon id="189" className="fil233" points="16536,11425 16536,11429 -1,11562 -1,11557 " />
                                <polygon id="190" className="fil234" points="16536,11428 16536,11432 -1,11565 -1,11560 " />
                                <polygon id="191" className="fil234" points="16536,11431 16536,11435 -1,11568 -1,11563 " />
                                <polygon id="192" className="fil235" points="16536,11434 16536,11438 -1,11571 -1,11566 " />
                                <polygon id="193" className="fil235" points="16536,11437 16536,11441 -1,11574 -1,11569 " />
                                <polygon id="194" className="fil236" points="16536,11440 16536,11444 -1,11577 -1,11572 " />
                                <polygon id="195" className="fil236" points="16536,11443 16536,11448 -1,11580 -1,11575 " />
                                <polygon id="196" className="fil236" points="16536,11446 16536,11451 -1,11583 -1,11578 " />
                                <polygon id="197" className="fil237" points="16536,11449 16536,11454 -1,11586 -1,11582 " />
                                <polygon id="198" className="fil238" points="16536,11452 16536,11457 -1,11589 -1,11585 " />
                                <polygon id="199" className="fil238" points="16536,11455 16536,11460 -1,11592 -1,11588 " />
                                <polygon id="200" className="fil238" points="16536,11458 16536,11463 -1,11595 -1,11591 " />
                                <polygon id="201" className="fil238" points="16536,11461 16536,11466 -1,11598 -1,11594 " />
                                <polygon id="202" className="fil239" points="16536,11464 16536,11469 -1,11601 -1,11597 " />
                                <polygon id="203" className="fil239" points="16536,11467 16536,11472 -1,11604 -1,11600 " />
                                <polygon id="204" className="fil239" points="16536,11470 16536,11475 -1,11607 -1,11603 " />
                                <polygon id="205" className="fil239" points="16536,11474 16536,11478 -1,11611 -1,11606 " />
                                <polygon id="206" className="fil240" points="16536,11477 16536,11481 -1,11614 -1,11609 " />
                                <polygon id="207" className="fil241" points="16536,11480 16536,11484 -1,11617 -1,11612 " />
                                <polygon id="208" className="fil241" points="16536,11483 16536,11487 -1,11620 -1,11615 " />
                                <polygon id="209" className="fil241" points="16536,11486 16536,11490 -1,11623 -1,11618 " />
                                <polygon id="210" className="fil242" points="16536,11489 16536,11493 -1,11626 -1,11621 " />
                                <polygon id="211" className="fil243" points="16536,11492 16536,11496 -1,11629 -1,11624 " />
                                <polygon id="212" className="fil244" points="16536,11495 16536,11499 0,11632 -1,11627 " />
                                <polygon id="213" className="fil245" points="16536,11498 16536,11503 0,11635 -1,11630 " />
                                <polygon id="214" className="fil245" points="16536,11501 16536,11506 0,11638 0,11633 " />
                                <polygon id="215" className="fil245" points="16536,11504 16536,11509 0,11641 0,11637 " />
                                <polygon id="216" className="fil246" points="16536,11507 16536,11512 0,11644 0,11640 " />
                                <polygon id="217" className="fil247" points="16536,11510 16536,11515 0,11647 0,11643 " />
                                <polygon id="218" className="fil247" points="16536,11513 16537,11518 0,11650 0,11646 " />
                                <polygon id="219" className="fil247" points="16536,11516 16537,11521 0,11653 0,11649 " />
                                <polygon id="220" className="fil247" points="16537,11519 16537,11524 0,11656 0,11652 " />
                                <polygon id="221" className="fil136" points="16537,11522 16537,11527 0,11659 0,11655 " />
                                <polygon id="222" className="fil136" points="16537,11525 16537,11530 0,11662 0,11658 " />
                                <polygon id="223" className="fil136" points="16537,11528 16537,11533 0,11666 0,11661 " />
                                <polygon id="224" className="fil248" points="16537,11532 16537,11536 0,11669 0,11664 " />
                                <polygon id="225" className="fil137" points="16537,11535 16537,11539 0,11672 0,11667 " />
                                <polygon id="226" className="fil137" points="16537,11538 16537,11542 0,11675 0,11670 " />
                                <polygon id="227" className="fil137" points="16537,11541 16537,11545 0,11678 0,11673 " />
                                <polygon id="228" className="fil138" points="16537,11544 16537,11548 0,11681 0,11676 " />
                                <polygon id="229" className="fil139" points="16537,11547 16537,11551 0,11684 0,11679 " />
                                <polygon id="230" className="fil139" points="16537,11550 16537,11554 0,11687 0,11682 " />
                                <polygon id="231" className="fil140" points="16537,11553 16537,11557 0,11690 0,11685 " />
                                <polygon id="232" className="fil140" points="16537,11556 16537,11561 0,11693 0,11688 " />
                                <polygon id="233" className="fil140" points="16537,11559 16537,11564 0,11696 0,11691 " />
                                <polygon id="234" className="fil141" points="16537,11562 16537,11567 0,11699 0,11695 " />
                                <polygon id="235" className="fil142" points="16537,11565 16537,11570 0,11702 0,11698 " />
                                <polygon id="236" className="fil142" points="16537,11568 16537,11573 0,11705 0,11701 " />
                                <polygon id="237" className="fil142" points="16537,11571 16537,11576 0,11708 0,11704 " />
                                <polygon id="238" className="fil143" points="16537,11574 16537,11579 0,11711 0,11707 " />
                                <polygon id="239" className="fil143" points="16537,11577 16537,11582 0,11714 0,11710 " />
                                <polygon id="240" className="fil143" points="16537,11580 16537,11585 0,11717 0,11713 " />
                                <polygon id="241" className="fil249" points="16537,11583 16537,11588 0,11721 0,11716 " />
                                <polygon id="242" className="fil144" points="16537,11587 16537,11591 0,11724 0,11719 " />
                                <polygon id="243" className="fil144" points="16537,11590 16537,11594 0,11727 0,11722 " />
                                <polygon id="244" className="fil144" points="16537,11593 16537,11597 0,11730 0,11725 " />
                                <polygon id="245" className="fil145" points="16537,11596 16537,11600 0,11733 0,11728 " />
                                <polygon id="246" className="fil146" points="16537,11599 16537,11603 0,11736 0,11731 " />
                                <polygon id="247" className="fil146" points="16537,11602 16537,11606 0,11739 0,11734 " />
                                <polygon id="248" className="fil147" points="16537,11605 16537,11609 0,11742 0,11737 " />
                                <polygon id="249" className="fil147" points="16537,11608 16537,11612 0,11745 0,11740 " />
                                <polygon id="250" className="fil250" points="16537,11611 16537,11616 0,11748 0,11743 " />
                                <polygon id="251" className="fil148" points="16537,11614 16537,11619 0,11751 0,11746 " />
                                <polygon id="252" className="fil148" points="16537,11617 16537,11622 0,11754 0,11750 " />
                                <polygon id="253" className="fil148" points="16537,11620 16537,11625 1,11757 0,11753 " />
                                <polygon id="254" className="fil149" points="16537,11623 16537,11628 1,11760 1,11756 " />
                                <polygon id="255" className="fil149" points="16537,11626 16538,11693 1,11825 1,11759 " />
                            </g>
                        </g>
                        <path className="fil251" d="M7890 10066l755 0 570 0 133 0c120,0 239,0 359,0 10,1 14,4 23,6 -216,36 -380,214 -382,428l0 0c0,452 0,-139 0,313 0,173 -106,317 -242,335l0 0c0,407 -717,137 -838,501 -122,-364 -839,-94 -839,-501l0 0c-135,-18 -242,-162 -242,-335 0,-452 0,139 0,-313l0 0c-1,-207 -154,-379 -358,-423 12,-6 32,-11 35,-11l323 0 134 0 569 0z" />
                        <path className="fil252" d="M0 9101c2756,0 5512,1594 8268,1594 2756,0 5512,-1594 8267,-1594 0,160 0,319 0,479 -2755,0 -5511,1203 -8267,1203 -2756,0 -5512,-1203 -8268,-1203 0,-160 0,-319 0,-479z" />
                        <path className="fil253" d="M16535 11693l-3646 0c1299,-1917 2797,-2882 3646,-3036l0 3036z" />
                        <path className="fil254" d="M16535 8657c-849,154 -2347,1119 -3646,3036 0,0 -104,0 -104,0 1024,-1989 2507,-2929 3750,-3363 0,47 0,93 0,139 0,63 0,125 0,188z" />
                        <path className="fil255" d="M16535 11693l-3646 0c1299,-1328 2797,-1997 3646,-2104l0 2104z" />
                        <path className="fil256" d="M0 11693l3646 0c-1299,-1917 -2796,-2882 -3646,-3036l0 3036z" />
                        <path className="fil257" d="M0 8657c850,154 2347,1119 3646,3036 0,0 105,0 105,0 -1025,-1989 -2508,-2929 -3751,-3363 0,47 0,93 0,139 0,63 0,125 0,188z" />
                        <path className="fil258" d="M0 11693l3646 0c-1299,-1328 -2796,-1997 -3646,-2104l0 2104z" />
                        <path className="fil259" d="M7890 10040l755 0 570 0 133 0c120,0 239,0 359,0 10,1 14,4 23,6 -216,36 -380,214 -382,428l0 0c0,452 0,-139 0,313 0,173 -106,317 -242,335l0 0c0,407 -717,137 -838,501 -122,-364 -839,-94 -839,-501l0 0c-135,-18 -242,-162 -242,-335 0,-452 0,139 0,-313l0 0c-1,-207 -154,-379 -358,-423 12,-6 32,-11 35,-11l323 0 134 0 569 0z" />
                        <path className="fil260" d="M7937 10051l662 0 499 0 117 0 405 0c-223,0 -404,180 -405,403l0 0c0,419 0,-129 0,291 0,160 -94,293 -213,310l1 0c0,377 -629,127 -735,465 -107,-338 -735,-88 -735,-465l0 0c-119,-17 -212,-150 -212,-310 0,-420 0,128 0,-291l0 0c-2,-223 -183,-403 -405,-403l405 0 117 0 499 0z" />
                        <path className="fil1" d="M7937 10051l662 0 499 0 117 0 405 0c-223,0 -404,180 -405,403l0 0c0,419 0,-129 0,291 0,160 -94,293 -213,310l1 0c0,377 -629,127 -735,465 -107,-338 -735,-88 -735,-465l0 0c-119,-17 -212,-150 -212,-310 0,-420 0,128 0,-291l0 0c-2,-223 -183,-403 -405,-403l405 0 117 0 499 0z" />
                        <path className="fil261" d="M4 0l16536 0 0 1490c-2756,0 -5512,-1282 -8268,-1282 -2756,0 -5512,1282 -8268,1282l0 -1490z" />
                    </g>
                </svg>


                <div className="print-content"
                    style={{ position: "absolute", top: "0", padding: "8%", color: "#fff" }}
                >
                    <center>
                        <h1 style={{ fontWeight: "900" }}>AKAD/IKRAR HALAL</h1>
                        No: 20210528/HC-UM-001
                        <br />
                        <br />
                        <span className="konten-item-print" style={{ width: "78%", display: "block" }}>
                            Yang bertanda tangan di bawah ini menyatakan ikrar.
                            bahwa produk "<b style={{ textTransform: "uppercase" }}>{props.namaProduk}</b>" yang telah saya hasilkan,
                            telah sesuai dengan Sistem Penjaminan Mutu Halal Internal <br />
                            (HC-UM HAKI No : 000169053 oleh Prof Dr Ir H Mohammad Bisri,MS.)
                            <br />
                            didampingi Halal Center Cinta Indonesia
                            <br />
                            <br />
                            Dinyatakan : <b style={{ textDecoration: "underline" }}><i>HALAL</i></b>
                            <br />

                        </span>
                        <br />
                        <br />
                        <strong>{day + ' ' + months[month] + ' ' + year}</strong>
                        <br />
                        <br />
                        <span className="head-ttd">
                            Pemilik Produk
                        </span>
                        <br />
                        <br />
                        <br />
                        <span className="foot-ttd">
                            <b>{props.penanggung_jwb}</b>
                        </span>
                        <br />
                        <br />
                        <span className="foot-ttd">
                            <b>Mengetahui</b>
                        </span>
                    </center>
                </div>
            </div>
        </div >
    )
}

export default index
