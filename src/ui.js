import renameProject from "./renameProject";
import deleteProject from "./deleteProject";
import createProject from "./createProject";
import { Picker } from "emoji-mart";
var _ = require("lodash");
import deleteTodo from "./deleteTodo";
import addTodo from "./addTodo";
import editTodo from "./editTodo";

const projectNameRegex = /[^A-Z a-z0-9_.-]/g;
const emojiRegex = /[\w()_.-]/g;

const getTodoData = () => {
  return JSON.parse(localStorage.getItem("todo"));
};

const circleBgIconStyleClasses =
  "aspect-square flex shrink-0 items-center basis-10 justify-center p-2 rounded-full transition";
const textStyleClasses =
  "flex-grow overflow-hidden whitespace-nowrap text-ellipsis";

const icon = `<svg class="h-12 w-12" width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="128" height="128" rx="28" fill="url(#paint0_linear_109_15)"/>
<rect x="7" y="7" width="114" height="114" rx="24" stroke="white" stroke-width="2"/>
<circle cx="64" cy="64" r="49.5" stroke="url(#paint1_linear_109_15)"/>
<circle cx="63.5454" cy="63.5454" r="42.7727" stroke="url(#paint2_linear_109_15)"/>
<path d="M27.7936 48.158L27.4708 48.8608L25.427 48.097L25.7525 47.3884C25.8441 47.1889 25.9639 47.0325 26.1118 46.9192C26.2591 46.8056 26.4267 46.7385 26.6146 46.718C26.8028 46.6969 27.003 46.7259 27.2152 46.8053C27.4281 46.8848 27.5932 46.9922 27.7103 47.1275C27.8277 47.2622 27.894 47.4174 27.9092 47.5932C27.9246 47.7683 27.8861 47.9566 27.7936 48.158ZM27.2931 48.3033L27.4154 48.037C27.4723 47.9131 27.4975 47.8004 27.4911 47.699C27.4843 47.5966 27.4428 47.5062 27.3666 47.4278C27.29 47.3485 27.1755 47.2804 27.0232 47.2235C26.8721 47.1671 26.7388 47.1426 26.6231 47.15C26.5078 47.1568 26.4081 47.194 26.324 47.2617C26.2399 47.3293 26.1694 47.4251 26.1125 47.549L25.9898 47.8162L27.2931 48.3033Z" fill="white" fill-opacity="0.75"/>
<path d="M28.9212 46.0436C28.8425 46.1924 28.7436 46.3067 28.6245 46.3863C28.5051 46.465 28.3728 46.5077 28.2274 46.5143C28.0813 46.5207 27.9294 46.4888 27.7718 46.4186C27.618 46.3502 27.4983 46.2612 27.4127 46.1518C27.3271 46.0423 27.2796 45.9208 27.2701 45.787C27.261 45.6527 27.294 45.5146 27.369 45.3727C27.4195 45.2772 27.4824 45.1955 27.5577 45.1274C27.6327 45.0584 27.7179 45.0071 27.8134 44.9736C27.9092 44.9394 28.0139 44.9263 28.1276 44.9342C28.2405 44.9419 28.3606 44.974 28.4878 45.0306L28.6017 45.0813L27.9557 46.3027L27.6988 46.1884L28.145 45.3446C28.0853 45.318 28.0258 45.307 27.9664 45.3116C27.9071 45.3162 27.8527 45.335 27.8031 45.3681C27.7533 45.4002 27.7129 45.4454 27.682 45.5038C27.6498 45.5647 27.6359 45.6252 27.6402 45.6853C27.6442 45.7445 27.6635 45.7981 27.6982 45.8461C27.7323 45.8938 27.7787 45.9311 27.8374 45.958L28.0817 46.0668C28.1557 46.0997 28.2266 46.1149 28.2944 46.1125C28.3625 46.1095 28.4241 46.09 28.4792 46.054C28.5343 46.0181 28.5796 45.9665 28.6151 45.8993C28.6387 45.8547 28.6538 45.811 28.6604 45.7682C28.667 45.7254 28.6643 45.685 28.6523 45.6471C28.6403 45.6092 28.6192 45.5749 28.5888 45.5444L28.8104 45.1846C28.8925 45.2444 28.9526 45.3189 28.9905 45.4079C29.0281 45.4959 29.0418 45.5943 29.0316 45.703C29.0211 45.8108 28.9843 45.9244 28.9212 46.0436Z" fill="white" fill-opacity="0.75"/>
<path d="M28.917 42.7789L30.078 44.0202L29.8158 44.4592L28.0682 44.2003L28.314 43.7887L29.5288 44.0336L29.5375 44.019L28.6706 43.1914L28.917 42.7789Z" fill="white" fill-opacity="0.75"/>
<path d="M31.174 42.435C31.0804 42.5748 30.9705 42.6779 30.8442 42.7441C30.7178 42.8094 30.5823 42.8372 30.4377 42.8275C30.2926 42.8175 30.1457 42.7685 29.9972 42.6806C29.8523 42.595 29.7433 42.4926 29.6702 42.3736C29.5971 42.2546 29.563 42.1277 29.5678 41.993C29.5731 41.8577 29.6203 41.7233 29.7096 41.5899C29.7696 41.5002 29.8405 41.4255 29.9222 41.3659C30.0037 41.3054 30.0934 41.2637 30.1915 41.2409C30.2899 41.2176 30.3949 41.2162 30.5064 41.2369C30.6174 41.2572 30.7328 41.3028 30.8526 41.3737L30.9599 41.4371L30.1914 42.5855L29.9493 42.4423L30.4802 41.649C30.424 41.6157 30.3663 41.5981 30.3071 41.596C30.2479 41.594 30.192 41.6067 30.1395 41.6341C30.0868 41.6606 30.0421 41.7013 30.0053 41.7562C29.967 41.8134 29.9468 41.8723 29.9447 41.9329C29.9424 41.9925 29.9558 42.0482 29.9851 42.1001C30.0137 42.1516 30.0557 42.1942 30.1109 42.2277L30.3411 42.3638C30.4108 42.405 30.4793 42.4282 30.5466 42.4334C30.6143 42.438 30.6774 42.4255 30.7357 42.3957C30.794 42.3659 30.8443 42.3195 30.8866 42.2563C30.9146 42.2144 30.9342 42.1724 30.9452 42.1304C30.9563 42.0883 30.9579 42.0477 30.9501 42.0084C30.9422 41.9692 30.9249 41.9326 30.8981 41.8986L31.1554 41.5639C31.2304 41.6329 31.2819 41.714 31.31 41.8073C31.3378 41.8995 31.3409 41.9994 31.3193 42.1069C31.2975 42.2135 31.2491 42.3228 31.174 42.435Z" fill="white" fill-opacity="0.75"/>
<path d="M30.4272 39.7113L32.2424 40.9218L31.9724 41.2865L30.1572 40.076L30.4272 39.7113Z" fill="white" fill-opacity="0.75"/>
<path d="M33.5909 39.2933C33.4863 39.4215 33.3676 39.5113 33.235 39.5627C33.1022 39.6131 32.9646 39.6258 32.822 39.6006C32.6789 39.5751 32.5403 39.5121 32.4061 39.4116C32.2708 39.3103 32.1732 39.1965 32.1133 39.0701C32.0528 38.9433 32.0324 38.8124 32.052 38.6773C32.0715 38.5412 32.1336 38.4091 32.2382 38.2809C32.3429 38.1527 32.4616 38.0634 32.5944 38.013C32.727 37.9616 32.8649 37.9486 33.008 37.9742C33.1505 37.9993 33.2895 38.0626 33.4248 38.1638C33.559 38.2643 33.6563 38.3779 33.7168 38.5047C33.7766 38.6311 33.7968 38.7623 33.7773 38.8984C33.7577 39.0335 33.6956 39.1651 33.5909 39.2933ZM33.3108 39.081C33.3584 39.0227 33.3811 38.9612 33.3789 38.8966C33.3761 38.8316 33.3529 38.7669 33.3094 38.7024C33.2663 38.6373 33.2067 38.5763 33.1305 38.5193C33.0543 38.4622 32.9781 38.4216 32.9017 38.3972C32.8259 38.3723 32.7546 38.3665 32.6881 38.3796C32.6215 38.3927 32.5644 38.4284 32.5168 38.4867C32.4687 38.5456 32.4456 38.6081 32.4475 38.6742C32.4499 38.7397 32.4726 38.8051 32.5157 38.8701C32.5592 38.9346 32.6191 38.9953 32.6953 39.0524C32.7715 39.1094 32.8475 39.1504 32.9234 39.1752C32.9997 39.1996 33.0714 39.2049 33.1384 39.1913C33.2053 39.1766 33.2628 39.1399 33.3108 39.081Z" fill="white" fill-opacity="0.75"/>
<path d="M34.9652 38.615L33.2462 37.1632L33.5464 36.8314L33.7564 37.0088L33.77 36.9937C33.7497 36.9506 33.7348 36.9004 33.7253 36.8431C33.7158 36.7849 33.7198 36.7233 33.7375 36.6583C33.7551 36.5923 33.7946 36.5254 33.8561 36.4574C33.9361 36.3689 34.0338 36.3075 34.1493 36.273C34.2641 36.2381 34.3896 36.2386 34.5255 36.2745C34.661 36.3099 34.8004 36.3881 34.9436 36.5091C35.083 36.6269 35.181 36.7482 35.2375 36.873C35.2939 36.9968 35.313 37.117 35.2947 37.2335C35.2764 37.349 35.2255 37.4528 35.1421 37.545C35.083 37.6103 35.0216 37.6565 34.9579 37.6835C34.8947 37.71 34.8332 37.7235 34.7733 37.7241C34.7129 37.7242 34.6585 37.7172 34.6099 37.7032L34.6006 37.7134L35.2696 38.2785L34.9652 38.615ZM34.1693 37.3617C34.2437 37.4245 34.3176 37.4692 34.391 37.496C34.4645 37.5227 34.5338 37.5302 34.5991 37.5184C34.6637 37.5061 34.7206 37.4729 34.7697 37.4186C34.8193 37.3638 34.8457 37.3044 34.8491 37.2404C34.8519 37.1759 34.8345 37.1105 34.7968 37.0443C34.759 36.9771 34.7038 36.9128 34.6311 36.8514C34.5589 36.7904 34.4866 36.7465 34.4142 36.7197C34.3417 36.6929 34.2729 36.6854 34.2077 36.6972C34.1424 36.709 34.0848 36.7426 34.0348 36.7979C33.9852 36.8527 33.9582 36.9116 33.9537 36.9747C33.9497 37.0373 33.9661 37.1018 34.0028 37.1681C34.0395 37.2344 34.095 37.2989 34.1693 37.3617Z" fill="white" fill-opacity="0.75"/>
<path d="M36.5277 36.1557C36.4086 36.2747 36.2814 36.3536 36.146 36.3924C36.0107 36.4303 35.8744 36.4289 35.7371 36.3885C35.5992 36.3475 35.4678 36.2676 35.3427 36.1486C35.2208 36.0326 35.1369 35.9077 35.091 35.7739C35.0451 35.6401 35.0384 35.5068 35.0709 35.374C35.1038 35.2408 35.1771 35.1174 35.2907 35.004C35.367 34.9277 35.4507 34.8687 35.5418 34.8269C35.6328 34.7842 35.7279 34.7619 35.8271 34.7602C35.9267 34.758 36.0282 34.7791 36.1315 34.8234C36.2343 34.8673 36.3361 34.9372 36.4369 35.0332L36.5273 35.1191L35.5496 36.0955L35.3458 35.9017L36.0212 35.2271C35.9739 35.1821 35.9219 35.1522 35.8652 35.1375C35.8086 35.1229 35.7522 35.1236 35.6959 35.1396C35.6396 35.1547 35.5881 35.1855 35.5414 35.2322C35.4926 35.2809 35.461 35.3351 35.4465 35.3948C35.4319 35.4534 35.4334 35.5117 35.4509 35.5695C35.4679 35.6268 35.4995 35.6779 35.5458 35.723L35.7396 35.9073C35.7983 35.9631 35.8595 36.0008 35.9233 36.0203C35.9876 36.0394 36.051 36.0403 36.1133 36.0232C36.1757 36.0061 36.2337 35.9707 36.2875 35.917C36.3232 35.8813 36.3507 35.8438 36.37 35.8044C36.3894 35.765 36.3993 35.725 36.3999 35.6843C36.4004 35.6437 36.3913 35.6036 36.3725 35.5642L36.6895 35.2866C36.7475 35.3712 36.7804 35.4628 36.7882 35.5613C36.796 35.6589 36.7784 35.7588 36.7354 35.8609C36.6924 35.9621 36.6232 36.0604 36.5277 36.1557Z" fill="white" fill-opacity="0.75"/>
<path d="M38.0008 34.7917C37.9085 34.8749 37.8032 34.927 37.6847 34.9479C37.5662 34.9677 37.4425 34.9517 37.3134 34.8999C37.1844 34.847 37.0576 34.7539 36.933 34.6205C36.8051 34.4834 36.7211 34.3492 36.6811 34.2179C36.6406 34.0861 36.6364 33.9641 36.6686 33.8518C36.7008 33.7386 36.7614 33.6417 36.8505 33.5613C36.9185 33.4999 36.9859 33.4601 37.0525 33.4421C37.1192 33.423 37.1823 33.4177 37.2418 33.4262C37.3012 33.4337 37.3534 33.4469 37.3982 33.4658L37.4085 33.4565L36.8487 32.8569L37.1847 32.5535L38.6737 34.1483L38.3416 34.4481L38.1628 34.2565L38.1485 34.2694C38.1637 34.3169 38.1721 34.3701 38.1737 34.429C38.1752 34.4868 38.163 34.5471 38.137 34.6098C38.1116 34.672 38.0662 34.7326 38.0008 34.7917ZM37.8611 34.4313C37.9154 34.3823 37.9477 34.3264 37.9579 34.2635C37.9683 34.1996 37.9587 34.1322 37.9293 34.0612C37.9005 33.9896 37.8528 33.9183 37.7864 33.8472C37.72 33.7761 37.6523 33.7234 37.5833 33.689C37.5143 33.6547 37.4475 33.6403 37.3829 33.6461C37.3183 33.6518 37.2588 33.6791 37.2045 33.7282C37.1492 33.7781 37.1163 33.835 37.106 33.8989C37.0957 33.9628 37.1052 34.0297 37.1347 34.0997C37.1641 34.1698 37.2111 34.2393 37.2756 34.3084C37.3405 34.3779 37.4077 34.4306 37.4771 34.4665C37.5466 34.5014 37.6141 34.517 37.6797 34.5133C37.7452 34.5086 37.8057 34.4813 37.8611 34.4313Z" fill="white" fill-opacity="0.75"/>
<path d="M40.6264 32.6244L39.6426 31.3167L40.0054 31.0441L40.9892 32.3517L40.6264 32.6244ZM39.6981 31.0112C39.6441 31.0517 39.5844 31.0686 39.5189 31.0619C39.4535 31.0542 39.4018 31.025 39.3638 30.9745C39.3263 30.9246 39.3131 30.8674 39.3242 30.8031C39.3355 30.7378 39.3681 30.6848 39.422 30.6443C39.476 30.6037 39.5356 30.5873 39.601 30.5951C39.6665 30.6018 39.718 30.6302 39.7556 30.6801C39.7936 30.7306 39.807 30.7885 39.7957 30.8539C39.7845 30.9182 39.752 30.9707 39.6981 31.0112Z" fill="white" fill-opacity="0.75"/>
<path d="M41.9682 30.5103L42.4944 31.2964L42.1193 31.5518L41.209 30.192L41.5665 29.9486L41.7271 30.1885L41.743 30.1777C41.72 30.0782 41.7283 29.9815 41.7679 29.8875C41.8072 29.7929 41.877 29.7115 41.9774 29.6431C42.0713 29.5792 42.1671 29.5441 42.2646 29.5378C42.3621 29.5316 42.4559 29.5536 42.546 29.604C42.6357 29.6537 42.716 29.7314 42.7867 29.8371L43.3663 30.7029L42.9911 30.9583L42.4566 30.1598C42.4014 30.0761 42.3368 30.0256 42.2628 30.0082C42.1883 29.9901 42.1135 30.0067 42.0384 30.0578C41.9879 30.0922 41.9505 30.1335 41.9264 30.1817C41.9029 30.2295 41.8943 30.2818 41.9006 30.3385C41.9071 30.3942 41.9296 30.4514 41.9682 30.5103Z" fill="white" fill-opacity="0.75"/>
<path d="M45.8452 29.2614L45.4115 29.4986L45.0735 27.1975L45.5951 26.9122L47.2538 28.4911L46.8201 28.7283L45.57 27.494L45.5551 27.5022L45.8452 29.2614ZM45.4255 28.5138L46.4499 27.9535L46.6148 28.2737L45.5903 28.834L45.4255 28.5138Z" fill="white" fill-opacity="0.75"/>
<path d="M47.6866 28.3082L47.0373 26.8061L47.4282 26.6209L47.5427 26.8859L47.5601 26.8777C47.5528 26.7751 47.5742 26.6813 47.6241 26.5964C47.674 26.5114 47.749 26.4453 47.8491 26.3978C47.9505 26.3497 48.0479 26.3346 48.1414 26.3523C48.2346 26.3694 48.312 26.416 48.3735 26.4921L48.3889 26.4848C48.3819 26.3844 48.4067 26.2898 48.4634 26.2009C48.5204 26.111 48.6032 26.0403 48.7116 25.9889C48.8496 25.9235 48.9809 25.9151 49.1055 25.9636C49.2305 26.0112 49.3282 26.1165 49.3986 26.2795L49.8353 27.2897L49.4261 27.4836L49.025 26.5556C48.9889 26.4721 48.9401 26.4199 48.8784 26.3989C48.8167 26.3778 48.7531 26.3828 48.6877 26.4138C48.6132 26.4491 48.5656 26.5008 48.5447 26.5688C48.5236 26.6362 48.5299 26.709 48.5637 26.7872L48.9602 27.7045L48.5626 27.8929L48.1577 26.9561C48.1258 26.8824 48.0796 26.8337 48.019 26.8097C47.9591 26.7855 47.8954 26.7894 47.828 26.8213C47.7825 26.8429 47.7465 26.8742 47.72 26.915C47.6939 26.9548 47.6793 27.0006 47.6762 27.0524C47.6728 27.1035 47.683 27.1568 47.707 27.2122L48.0967 28.1138L47.6866 28.3082Z" fill="white" fill-opacity="0.75"/>
<path d="M49.932 27.2962L49.3786 25.7563L49.7858 25.5897L49.8824 25.8584L49.8981 25.8519C49.8914 25.7451 49.9118 25.6539 49.9593 25.5785C50.0066 25.5024 50.0727 25.447 50.1575 25.4124C50.1785 25.4038 50.2017 25.3958 50.227 25.3885C50.2523 25.3813 50.2749 25.3762 50.295 25.3734L50.4312 25.7523C50.4093 25.7544 50.3801 25.7602 50.3436 25.7698C50.3071 25.7793 50.2744 25.79 50.2454 25.8019C50.1837 25.8271 50.1334 25.8634 50.0946 25.9107C50.0562 25.9571 50.0315 26.0101 50.0205 26.0698C50.0102 26.1292 50.0163 26.1903 50.0389 26.2532L50.352 27.1244L49.932 27.2962Z" fill="white" fill-opacity="0.75"/>
<path d="M51.9385 26.5191L51.4695 24.9514L51.8972 24.7996L52.3662 26.3674L51.9385 26.5191ZM51.6239 24.6731C51.5603 24.6956 51.4994 24.6935 51.441 24.6668C51.3832 24.6392 51.3452 24.5951 51.327 24.5345C51.3091 24.4746 51.3162 24.4153 51.3482 24.3565C51.3807 24.2968 51.4287 24.2557 51.4923 24.2332C51.5559 24.2106 51.6167 24.2131 51.6745 24.2408C51.7329 24.2675 51.771 24.3108 51.7889 24.3707C51.807 24.4312 51.7998 24.4914 51.7673 24.5511C51.7353 24.6098 51.6875 24.6505 51.6239 24.6731Z" fill="white" fill-opacity="0.75"/>
<path d="M54.1176 24.0968L54.1976 24.4283L53.2542 24.7132L53.1743 24.3818L54.1176 24.0968ZM53.2965 23.9359L53.731 23.8047L54.0886 25.2878C54.0985 25.3285 54.1122 25.3584 54.13 25.3775C54.1475 25.3959 54.1683 25.4063 54.1922 25.4087C54.2168 25.4109 54.2437 25.4076 54.273 25.3988C54.2934 25.3926 54.3133 25.3847 54.3329 25.3751C54.3523 25.3648 54.3672 25.357 54.3776 25.3516L54.5251 25.6593C54.505 25.6728 54.4763 25.69 54.439 25.7108C54.4019 25.7324 54.3554 25.7528 54.2995 25.7719C54.1958 25.8076 54.1006 25.8212 54.0139 25.8126C53.9279 25.8037 53.8548 25.7717 53.7949 25.7165C53.7349 25.6613 53.6926 25.5815 53.6682 25.477L53.2965 23.9359Z" fill="white" fill-opacity="0.75"/>
<path d="M56.8347 23.8811L56.4359 24.0058C56.4227 23.9725 56.4022 23.9447 56.3744 23.9224C56.3464 23.8993 56.3123 23.884 56.2721 23.8764C56.2324 23.868 56.187 23.87 56.136 23.8826C56.0677 23.8994 56.0128 23.9283 55.9712 23.9692C55.9295 24.0094 55.913 24.0537 55.9217 24.1019C55.9286 24.1403 55.9497 24.1691 55.9848 24.1882C56.02 24.2072 56.0759 24.2157 56.1526 24.2136L56.4507 24.2014C56.611 24.1955 56.7355 24.2188 56.8242 24.2714C56.913 24.3239 56.9678 24.4082 56.9888 24.5243C57.0079 24.6298 56.9939 24.73 56.947 24.8248C56.9007 24.9194 56.8285 25.0022 56.7304 25.0731C56.6328 25.1432 56.5151 25.1952 56.3772 25.2292C56.1669 25.2811 55.9913 25.278 55.8504 25.22C55.7101 25.1612 55.6154 25.0575 55.5662 24.909L55.9955 24.7791C56.0203 24.8408 56.061 24.8826 56.1175 24.9045C56.1739 24.9256 56.2414 24.9265 56.32 24.9071C56.3973 24.8881 56.4566 24.8577 56.4981 24.8161C56.5401 24.7736 56.5571 24.7282 56.5491 24.6798C56.5411 24.6394 56.5182 24.6104 56.4804 24.5927C56.4425 24.5743 56.3878 24.5666 56.3163 24.5696L56.0311 24.5819C55.8703 24.5887 55.7449 24.5627 55.6551 24.5038C55.5659 24.4448 55.5104 24.3552 55.4887 24.2349C55.47 24.1315 55.4815 24.0356 55.5231 23.9472C55.5655 23.8586 55.6333 23.7817 55.7267 23.7163C55.8207 23.6508 55.9356 23.6013 56.0715 23.5678C56.2722 23.5183 56.4378 23.5223 56.5685 23.5799C56.6999 23.6373 56.7887 23.7377 56.8347 23.8811Z" fill="white" fill-opacity="0.75"/>
<path d="M58.2568 24.8269C58.1543 24.8466 58.0607 24.8462 57.9761 24.8257C57.8914 24.8044 57.8214 24.7627 57.766 24.7005C57.7112 24.6374 57.6772 24.5523 57.6641 24.4451C57.6531 24.3549 57.6603 24.276 57.6856 24.2083C57.7109 24.1407 57.7495 24.0827 57.8014 24.0345C57.8534 23.9863 57.9141 23.9458 57.9836 23.9129C58.0538 23.8799 58.1282 23.8519 58.2068 23.8289C58.299 23.8011 58.3732 23.7774 58.4294 23.758C58.4855 23.7378 58.5253 23.7164 58.549 23.6939C58.5727 23.6713 58.5824 23.6427 58.5782 23.6082L58.5774 23.6018C58.5692 23.5348 58.542 23.487 58.4956 23.4584C58.45 23.4297 58.3892 23.4226 58.3132 23.4372C58.233 23.4526 58.1713 23.4829 58.1283 23.528C58.0852 23.5723 58.0592 23.6228 58.0504 23.6793L57.6341 23.7247C57.643 23.622 57.6737 23.5288 57.7263 23.445C57.7788 23.3606 57.8512 23.2897 57.9434 23.2323C58.0362 23.1741 58.1468 23.1326 58.2751 23.1079C58.3644 23.0908 58.4511 23.0849 58.5353 23.0904C58.6202 23.0957 58.6971 23.1145 58.766 23.1467C58.8356 23.1788 58.8931 23.2262 58.9386 23.2889C58.984 23.3509 59.0126 23.4301 59.0243 23.5267L59.158 24.6223L58.7353 24.7035L58.7079 24.4783L58.6953 24.4807C58.6757 24.5364 58.6466 24.5878 58.6081 24.6349C58.5695 24.6813 58.5212 24.7212 58.4632 24.7548C58.4051 24.7876 58.3363 24.8116 58.2568 24.8269ZM58.3465 24.4915C58.4121 24.4789 58.4684 24.4547 58.5154 24.419C58.5623 24.3825 58.5974 24.339 58.6205 24.2884C58.6435 24.2378 58.6516 24.1839 58.6446 24.1268L58.6236 23.9544C58.6108 23.9663 58.5926 23.9784 58.5692 23.9909C58.5463 24.0025 58.5203 24.0143 58.4911 24.0264C58.4618 24.0378 58.4324 24.0489 58.403 24.0596C58.3736 24.0696 58.3468 24.0787 58.3228 24.0869C58.2715 24.1047 58.2273 24.1258 58.1903 24.1503C58.1533 24.1747 58.1258 24.2034 58.1077 24.2365C58.0895 24.2689 58.083 24.3062 58.0881 24.3485C58.0956 24.4098 58.1233 24.4525 58.1712 24.4765C58.2197 24.4996 58.2781 24.5046 58.3465 24.4915Z" fill="white" fill-opacity="0.75"/>
<path d="M59.8838 24.5194L59.7784 22.8865L60.2142 22.8261L60.2326 23.111L60.2495 23.1087C60.2725 23.0032 60.3171 22.9198 60.3835 22.8584C60.4497 22.7963 60.5282 22.759 60.619 22.7464C60.6415 22.7433 60.6658 22.7414 60.6921 22.7406C60.7183 22.7398 60.7414 22.7405 60.7614 22.7428L60.7873 23.1446C60.7658 23.1412 60.7363 23.1396 60.6987 23.1398C60.6611 23.14 60.6268 23.1422 60.5958 23.1465C60.5297 23.1557 60.4715 23.1784 60.4213 23.2147C60.3718 23.2501 60.3336 23.2955 60.3066 23.3507C60.2804 23.4058 60.2694 23.4667 60.2737 23.5333L60.3333 24.4572L59.8838 24.5194Z" fill="white" fill-opacity="0.75"/>
<rect x="18.798" y="68.1827" width="15.4069" height="43.2985" rx="7.70343" transform="rotate(-45 18.798 68.1827)" fill="url(#paint3_linear_109_15)" fill-opacity="0.8" stroke="url(#paint4_linear_109_15)"/>
<rect x="38.5841" y="87.9687" width="40.0171" height="15.4069" rx="7.70343" transform="rotate(-45 38.5841 87.9687)" fill="url(#paint5_linear_109_15)" fill-opacity="0.8" stroke="url(#paint6_linear_109_15)"/>
<rect x="56.1225" y="70.4302" width="42.0049" height="15.4069" rx="7.70343" transform="rotate(-45 56.1225 70.4302)" fill="url(#paint7_linear_109_15)" fill-opacity="0.8" stroke="url(#paint8_linear_109_15)"/>
<rect x="74.4593" y="52.0934" width="33.0839" height="15.4069" rx="7.70343" transform="rotate(-45 74.4593 52.0934)" fill="url(#paint9_linear_109_15)" fill-opacity="0.8" stroke="url(#paint10_linear_109_15)"/>
<defs>
<linearGradient id="paint0_linear_109_15" x1="64" y1="0" x2="64" y2="128" gradientUnits="userSpaceOnUse">
<stop stop-color="#5EC6F5"/>
<stop offset="1" stop-color="#007AFF"/>
</linearGradient>
<linearGradient id="paint1_linear_109_15" x1="64" y1="14" x2="64" y2="114" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="0.5" stop-color="white" stop-opacity="0.47"/>
<stop offset="1" stop-color="white" stop-opacity="0.79"/>
</linearGradient>
<linearGradient id="paint2_linear_109_15" x1="63.5454" y1="21.2727" x2="63.5454" y2="105.818" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="0.5" stop-color="white" stop-opacity="0.47"/>
<stop offset="1" stop-color="white" stop-opacity="0.79"/>
</linearGradient>
<linearGradient id="paint3_linear_109_15" x1="26.2943" y1="68.1827" x2="26.2943" y2="112.481" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint4_linear_109_15" x1="26.2943" y1="68.1827" x2="26.2943" y2="112.481" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0.3"/>
</linearGradient>
<linearGradient id="paint5_linear_109_15" x1="79.0573" y1="97.1162" x2="37.8723" y2="97.1162" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint6_linear_109_15" x1="78.7612" y1="96.2417" x2="37.9418" y2="96.5631" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0.3"/>
</linearGradient>
<linearGradient id="paint7_linear_109_15" x1="92.0949" y1="80.7378" x2="55.5505" y2="78.9975" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint8_linear_109_15" x1="98.495" y1="78.0604" x2="55.4258" y2="78.7032" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0.3"/>
</linearGradient>
<linearGradient id="paint9_linear_109_15" x1="107.992" y1="59.7907" x2="74.0584" y2="60.0807" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint10_linear_109_15" x1="107.613" y1="61.0093" x2="73.5435" y2="60.3665" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0.3"/>
</linearGradient>
</defs>
</svg>      
`;

export default class ui {
  static desktopUi() {
    const topBarUi = () => {
      const topBar = document.getElementById("topBar");
      const appIcon = document.createElement("div");
      appIcon.innerHTML += icon;

      const appName = document.createElement("span");
      const name = document.createElement("p");
      name.textContent = "Todo Dump";
      name.className = "text-xl";

      const namePreview = document.createElement("p");
      namePreview.textContent = "PREVIEW";
      namePreview.className = "text-[0.5rem] font-bold";

      appName.className = "flex";
      appName.append(name, namePreview);
      appIcon.className = "flex items-center gap-4";

      appIcon.append(appName);

      const settingsIcon = document.createElement("div");
      settingsIcon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M12 11V16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 8V8.1L11.9502 8.1002V8H12.0498Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      settingsIcon.className =
        "bg-gray-200 p-2 rounded-full border-2 border-gray-400/20 hover:border-gray-400/80 transition duration-200 cursor-pointer";
      settingsIcon.addEventListener("click", () => {
        // do something
      });

      topBar.append(appIcon, settingsIcon);
      topBar.className =
        "flex px-4 py-6 justify-between items-center select-none";
    };

    const sideBar = () => {
      const sidebar = document.getElementById("sidebar");

      const today = new Date();
      const day = today.getDate();

      const homeAndDayArray = [
        {
          name: "Home",
          view: function () {
            homeView();
          },
          svg: `<svg class="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Navigation / House_01"><path id="Vector" d="M20 17.0002V11.4522C20 10.9179 19.9995 10.6506 19.9346 10.4019C19.877 10.1816 19.7825 9.97307 19.6546 9.78464C19.5102 9.57201 19.3096 9.39569 18.9074 9.04383L14.1074 4.84383C13.3608 4.19054 12.9875 3.86406 12.5674 3.73982C12.1972 3.63035 11.8026 3.63035 11.4324 3.73982C11.0126 3.86397 10.6398 4.19014 9.89436 4.84244L5.09277 9.04383C4.69064 9.39569 4.49004 9.57201 4.3457 9.78464C4.21779 9.97307 4.12255 10.1816 4.06497 10.4019C4 10.6506 4 10.9179 4 11.4522V17.0002C4 17.932 4 18.3978 4.15224 18.7654C4.35523 19.2554 4.74432 19.6452 5.23438 19.8482C5.60192 20.0005 6.06786 20.0005 6.99974 20.0005C7.93163 20.0005 8.39808 20.0005 8.76562 19.8482C9.25568 19.6452 9.64467 19.2555 9.84766 18.7654C9.9999 18.3979 10 17.932 10 17.0001V16.0001C10 14.8955 10.8954 14.0001 12 14.0001C13.1046 14.0001 14 14.8955 14 16.0001V17.0001C14 17.932 14 18.3979 14.1522 18.7654C14.3552 19.2555 14.7443 19.6452 15.2344 19.8482C15.6019 20.0005 16.0679 20.0005 16.9997 20.0005C17.9316 20.0005 18.3981 20.0005 18.7656 19.8482C19.2557 19.6452 19.6447 19.2554 19.8477 18.7654C19.9999 18.3978 20 17.932 20 17.0002Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`,
        },
        {
          name: "Today",
          view: function () {
            todayView();
          },
          svg: `<svg class="w-6 h-6" width="24" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 8H20M4 8V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V8M4 8V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H8M20 8V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H16M16 2V4M16 4H8M8 2V4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><text font-family="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'SF Pro Rounded'" font-size="9" transform="translate(4 2)"  font-weight="900" fill="currentColor"><tspan x="8" y="15" text-anchor="middle" id="todayDate">${day}</tspan></text></svg>`,
        },
        {
          name: "Past",
          view: function () {
            pastView();
          },
          svg: `<svg class="w-6 h-6" width="24" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 8H20M4 8V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V8M4 8V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H8M20 8V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H16M16 2V4M16 4H8M8 2V4M16 14H8M8 14L10.5 16.5M8 14L10.5 11.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        },
        {
          name: "This Week",
          view: function () {
            weekView();
          },
          svg: `<svg class="w-6 h-6" width="24" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Calendar / Calendar_Week"><path id="Vector" d="M4 8H20M4 8V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V8M4 8V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H8M20 8V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H16M8 4H16M8 4V2M16 4V2M16 12H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`,
        },
        {
          name: "This Month",
          view: function () {
            monthView();
          },
          svg: `<svg class="w-6 h-6" width="24" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Calendar / Calendar_Days"><path id="Vector" d="M8 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002V8M8 4H16M8 4V2M16 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V8M16 4V2M4 8V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V8M4 8H20M16 16H16.002L16.002 16.002L16 16.002V16ZM12 16H12.002L12.002 16.002L12 16.002V16ZM8 16H8.002L8.00195 16.002L8 16.002V16ZM16.002 12V12.002L16 12.002V12H16.002ZM12 12H12.002L12.002 12.002L12 12.002V12ZM8 12H8.002L8.00195 12.002L8 12.002V12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`,
        },
      ];

      const homeAndDay = document.createElement("div");

      for (let i = 0; i < homeAndDayArray.length; i++) {
        const span = document.createElement("span");
        span.className =
          "flex items-center cursor-pointer gap-2 transition hover:text-spl-blue";

        const icon = document.createElement("div");
        icon.innerHTML += homeAndDayArray[i].svg;
        icon.className = circleBgIconStyleClasses;

        const text = document.createElement("p");
        text.textContent = homeAndDayArray[i].name;
        text.className = textStyleClasses;

        span.addEventListener("click", () => {
          homeAndDayArray[i].view();
        });

        span.append(icon, text);
        homeAndDay.append(span);
      }

      homeAndDay.className = "flex flex-col gap 2";

      sidebar.className =
        "min-w-[256px] px-4 flex flex-col gap-2 select-none overflow-y-scroll";
      sidebar.append(homeAndDay, createNewProjectBtn, projects());
    };

    const createNewProjectBtn = document.createElement("span");
    createNewProjectBtn.className =
      "flex items-center gap-2 cursor-pointer mt-4";

    const addIcon = document.createElement("div");
    addIcon.innerHTML += `<svg class="w-6 h-6" width="24" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="File / Folder_Add"><path id="Vector" d="M12 16V13M12 13V10M12 13H9M12 13H15M3 6V16.8C3 17.9201 3 18.4798 3.21799 18.9076C3.40973 19.2839 3.71547 19.5905 4.0918 19.7822C4.5192 20 5.07899 20 6.19691 20H17.8031C18.921 20 19.48 20 19.9074 19.7822C20.2837 19.5905 20.5905 19.2841 20.7822 18.9078C21.0002 18.48 21.0002 17.9199 21.0002 16.7998L21.0002 9.19978C21.0002 8.07967 21.0002 7.51962 20.7822 7.0918C20.5905 6.71547 20.2839 6.40973 19.9076 6.21799C19.4798 6 18.9201 6 17.8 6H12M3 6H12M3 6C3 4.89543 3.89543 4 5 4H8.67452C9.1637 4 9.40886 4 9.63904 4.05526C9.84311 4.10425 10.0379 4.18526 10.2168 4.29492C10.4186 4.41857 10.5918 4.59182 10.9375 4.9375L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`;
    addIcon.className = circleBgIconStyleClasses;
    addIcon.classList.add("bg-spl-blue");
    addIcon.classList.add("text-white");

    const createNewText = document.createElement("p");
    createNewText.textContent = "Add New Project";
    createNewText.className = textStyleClasses;

    createNewProjectBtn.append(addIcon, createNewText);

    createNewProjectBtn.addEventListener("mouseover", () => {
      addIcon.classList.add("shadow-lg");
    });
    createNewProjectBtn.addEventListener("mouseleave", () => {
      addIcon.classList.remove("shadow-lg");
    });

    createNewProjectBtn.addEventListener("click", () => {
      addProjectForm();
    });

    const projects = () => {
      const projects = document.createElement("div");
      projects.id = "sidebarProjects";
      projects.className = "flex flex-col gap-2";

      const sortedKeyArray = this.getProjectNamesSorted();

      sortedKeyArray.forEach((key) => {
        const project = document.createElement("span");
        project.className =
          "flex justify-end gap-2 items-center cursor-pointer";

        const emoji = document.createElement("p");
        emoji.textContent = this.getProjectNameEmoji(key);
        emoji.className = circleBgIconStyleClasses;
        emoji.style.backgroundColor = this.randomColorPastel();

        const projectName = document.createElement("p");
        projectName.textContent = this.getProjectNameOnly(key);
        projectName.className = textStyleClasses;

        const editBtn = document.createElement("div");
        editBtn.innerHTML += `<svg class="w-6 h-6" width="24" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Edit / Edit_Pencil_02"><path id="Vector" d="M4 16.0001V20.0001L8 20.0001L18.8686 9.13146L18.8695 9.13061C19.265 8.73516 19.4628 8.53736 19.5369 8.3092C19.6021 8.10835 19.6022 7.89201 19.5369 7.69117C19.4627 7.46284 19.2646 7.26474 18.8686 6.86872L17.1288 5.12892C16.7345 4.7346 16.5369 4.53704 16.3091 4.46301C16.1082 4.39775 15.8919 4.39775 15.691 4.46301C15.463 4.53709 15.2652 4.73488 14.8704 5.12976L14.8686 5.13146L4 16.0001Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`;
        editBtn.className =
          "text-gray-500 w-0 transition-all bg-gradient-to-r from-white/0 to-white to-20% overflow-hidden";
        editBtn.addEventListener("click", () => {
          editProjectForm(key);
        });

        project.addEventListener("click", (e) => {
          if (e.target.nodeName === "SPAN" || e.target.nodeName === "P") {
            openProject(key);
          }
        });
        project.addEventListener("mouseover", () => {
          emoji.classList.add("shadow-lg");
          editBtn.classList.remove("w-0");
          editBtn.classList.add("w-8");
          projectName.classList.add("flex-shrink-[50]");
        });
        project.addEventListener("mouseout", () => {
          emoji.classList.remove("shadow-lg");
          editBtn.classList.remove("w-8");
          editBtn.classList.add("w-0");
          editBtn.classList.remove("absolute");
          projectName.classList.remove("text-ellipsis");
          projectName.classList.remove("flex-shrink-[50]");
          setTimeout(() => {
            projectName.classList.add("text-ellipsis");
          }, 150);
        });

        project.append(emoji, projectName, editBtn);
        projects.appendChild(project);
      });
      return projects;
    };

    const updateSidebarProjects = () => {
      const newProjects = projects();
      document.getElementById("sidebarProjects").replaceWith(newProjects);
    };

    const addBackdrop = () => {
      const backdrop = document.createElement("div");
      backdrop.id = "backdrop";
      backdrop.className =
        "h-screen w-screen absolute top-0 left-0 bg-white/70 hidden opacity-0 -z-10 duration-500 transition-all select-none";
      document.body.append(backdrop);
      backdrop.addEventListener("click", (e) => {
        if (e.target.id === "backdrop") {
          deactivateBackdrop();
        }
      });
    };

    const activateBackdrop = () => {
      const backdrop = document.getElementById("backdrop");
      backdrop.classList.remove("hidden");
      backdrop.classList.remove("-z-10");
      setTimeout(() => {
        backdrop.classList.add("opacity-100");
        backdrop.classList.add("backdrop-blur");
      }, 0);
    };

    const deactivateBackdrop = () => {
      const backdrop = document.getElementById("backdrop");
      backdrop.classList.remove("opacity-100");
      backdrop.classList.remove("backdrop-blur");
      setTimeout(() => {
        backdrop.classList.add("hidden");
        backdrop.classList.add("-z-10");

        backdrop.innerHTML = "";
      }, 300);
    };

    const bigTextStyleClasses = "text-3xl font-bold";

    const editProjectForm = (name) => {
      activateBackdrop();
      const form = document.createElement("div");
      form.className =
        "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 flex flex-col w-screen max-w-lg";
      form.id = "form";

      const oldEmoji = this.getProjectNameEmoji(name);
      const oldName = this.getProjectNameOnly(name);

      const rename = document.createElement("div");
      rename.className = "flex flex-col gap-4";
      const renameP = document.createElement("h1");
      renameP.textContent = "Rename";
      renameP.className = bigTextStyleClasses;

      const nameContainer = document.createElement("div");
      nameContainer.className = "flex gap-2 items-center";

      const emojiP = document.createElement("p");
      emojiP.textContent = oldEmoji;
      emojiP.className = circleBgIconStyleClasses;
      emojiP.classList.add("w-10");
      emojiP.classList.add("pastel-rainbow-bg");

      const nameP = document.createElement("p");
      nameP.textContent = oldName;
      nameP.className = "text-xl";

      nameContainer.append(emojiP, nameP);

      const to = document.createElement("h1");
      to.textContent = "to";
      to.className = bigTextStyleClasses;

      const renameInputs = document.createElement("div");
      renameInputs.className = "flex gap-2";

      const newEmojiContainer = document.createElement("div");
      newEmojiContainer.className = circleBgIconStyleClasses;
      newEmojiContainer.classList.add("w-10");
      newEmojiContainer.classList.add("pastel-rainbow-bg");
      newEmojiContainer.classList.add("cursor-pointer");

      const emojiSelectorContainer = document.createElement("div");
      emojiSelectorContainer.className = "mx-auto w-full transition-all";

      const newEmoji = document.createElement("p");
      newEmoji.textContent = oldEmoji;

      newEmojiContainer.appendChild(newEmoji);

      newEmojiContainer.addEventListener("click", () => {
        this.newEmojiSelector(emojiSelectorContainer, newEmoji);
      });

      const newName = document.createElement("input");
      newName.type = "text";
      newName.placeholder = oldName;
      newName.className =
        "w-full bg-transparent focus:outline-none rounded-none border-b";

      newName.addEventListener("keypress", (event) => {
        const regex = /[a-zA-Z0-9 _\-\.]/;
        const value = event.key;
        inputError.classList.add("h-0");
        if (!regex.test(value)) {
          event.preventDefault();
          inputError.classList.remove("h-0");
        }
      });

      renameInputs.append(newEmojiContainer, newName);

      const inputError = document.createElement("p");
      inputError.textContent =
        "Only alphanumeric characters, hyphen, dot, and underscore are allowed.";
      inputError.className = "text-red-500 text-xs h-0 overflow-hidden mx-auto";

      const renameBtn = document.createElement("button");
      renameBtn.textContent = "Rename it";
      renameBtn.className =
        "bg-spl-blue text-white font-bold w-fit mx-auto px-8 py-2 rounded-lg hover:shadow-lg hover:shadow-spl-blue/30 transition";
      renameBtn.addEventListener("click", () => {
        var newEmojiValue = "";
        if (!newEmoji.textContent) {
          newEmojiValue = oldEmoji;
        } else newEmojiValue = newEmoji.textContent;

        var newNameValue = "";
        if (!newName.value) {
          newNameValue = oldName;
        } else newNameValue = newName.value;

        for (let i = 0; i < [...newName.value].length; i++) {
          if (!/[a-zA-Z0-9 _.-]/.test([...newName.value][i])) {
            inputError.classList.remove("h-0");
          }
        }

        if (inputError.classList.contains("h-0")) {
          renameProject(name, newEmojiValue + newNameValue);
          updateSidebarProjects();
          openProject(newEmojiValue + newNameValue);
          deactivateBackdrop();
        }
      });

      rename.append(
        renameP,
        nameContainer,
        to,
        renameInputs,
        inputError,
        emojiSelectorContainer,
        renameBtn
      );

      const or = document.createElement("h1");
      or.textContent = "Or";
      or.className = bigTextStyleClasses;
      or.classList.add("my-4");

      const deleteBtn = document.createElement("button");
      deleteBtn.className =
        "bg-red-500 text-white font-bold w-fit mx-auto px-8 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/30 transition";
      deleteBtn.textContent = "Delete it";
      deleteBtn.addEventListener("click", () => {
        deleteProject(name);
        homeView();
        updateSidebarProjects();
        deactivateBackdrop();
      });

      form.append(rename, or, deleteBtn);

      document.getElementById("backdrop").append(form);
    };

    const addProjectForm = () => {
      activateBackdrop();
      const form = document.createElement("div");
      form.className =
        "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 flex flex-col gap-4 w-screen max-w-lg";
      form.id = "form";

      const addTitle = document.createElement("h1");
      addTitle.textContent = "Add a new Project";
      addTitle.className = bigTextStyleClasses;

      const emojiSelectionDiv = document.createElement("div");
      emojiSelectionDiv.className = "flex gap-2 items-center text-lg";

      const preEmojiText = document.createElement("p");
      preEmojiText.textContent = "with this";

      const emojiContainer = document.createElement("div");
      emojiContainer.className = circleBgIconStyleClasses;
      emojiContainer.classList.add("w-10");
      emojiContainer.classList.add("pastel-rainbow-bg");
      emojiContainer.classList.add("cursor-pointer");

      const emojiP = document.createElement("p");
      emojiP.textContent = "☺︎";
      emojiP.className = "text-black/50 text-base";

      emojiContainer.appendChild(emojiP);

      const emojiSelectorContainer = document.createElement("div");
      emojiSelectorContainer.className = "mx-auto w-full transition-all";

      emojiContainer.addEventListener("click", () => {
        this.newEmojiSelector(emojiSelectorContainer, emojiP);
        emojiContainer.classList.remove("outline");
      });

      const afterEmojiText = document.createElement("p");
      afterEmojiText.textContent = "emoji and";

      emojiSelectionDiv.append(preEmojiText, emojiContainer, afterEmojiText);

      const nameInputDiv = document.createElement("div");
      nameInputDiv.className = "flex gap-4 text-lg";

      const preNameText = document.createElement("p");
      preNameText.textContent = "named";

      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.placeholder = "something";
      nameInput.className =
        "w-full bg-transparent focus:outline-none border-b rounded-none";

      nameInput.addEventListener("keypress", (event) => {
        const regex = /[a-zA-Z0-9 _\-\.]/;
        const value = event.key;
        inputError.classList.add("h-0");
        if (!regex.test(value)) {
          event.preventDefault();
          inputError.classList.remove("h-0");
        }
      });

      const fullStop = document.createElement("p");
      fullStop.textContent = ".";

      nameInputDiv.append(preNameText, nameInput, fullStop);

      const inputError = document.createElement("p");
      inputError.textContent =
        "Only alphanumeric characters, hyphen, dot, and underscore are allowed.";
      inputError.className = "text-red-500 text-xs h-0 overflow-hidden mx-auto";

      const addBtn = document.createElement("button");
      addBtn.textContent = "Add it";
      addBtn.className =
        "bg-spl-blue text-white font-bold w-fit mx-auto px-8 py-2 rounded-lg hover:shadow-lg hover:shadow-spl-blue/30 transition";

      addBtn.addEventListener("click", () => {
        if (emojiP.textContent === "☺︎") {
          emojiContainer.classList.add("outline-red-500");
          emojiContainer.classList.add("outline");
          emojiContainer.classList.add("outline-1");
        }
        if (!nameInput.value) {
          nameInput.classList.add("border-red-500");
        }

        [...nameInput.value].forEach;
        for (let i = 0; i < [...nameInput.value].length; i++) {
          if (!/[a-zA-Z0-9 _.-]/.test([...nameInput.value][i])) {
            inputError.classList.remove("h-0");
          }
        }

        if (
          emojiP.textContent !== "☺︎" &&
          nameInput.value &&
          inputError.classList.contains("h-0")
        ) {
          createProject(emojiP.textContent + nameInput.value);
          updateSidebarProjects();
          deactivateBackdrop();
        }
      });

      form.append(
        addTitle,
        emojiSelectionDiv,
        emojiSelectorContainer,
        nameInputDiv,
        inputError,
        addBtn
      );
      document.getElementById("backdrop").append(form);
    };

    const openProject = (project) => {
      const projectName = document.createElement("span");
      projectName.className = "flex gap-4 items-center";

      const emoji = document.createElement("p");
      emoji.textContent = this.getProjectNameEmoji(project);
      emoji.className = circleBgIconStyleClasses;
      emoji.classList.add("text-4xl");
      emoji.classList.add("h-16");
      emoji.classList.add("pastel-rainbow-bg");

      const name = document.createElement("p");
      name.textContent = this.getProjectNameOnly(project);
      name.className = "text-5xl font-thin";

      projectName.append(emoji, name);

      const projectTodoData = getTodoData()[project];
      // console.log(projectTodoData);

      const todo = document.createElement("div");
      todo.id = "todoDiv";

      printTodo(todo, projectTodoData, project);

      this.changeContent(projectName, todo, addTodoUi(project, todo));
    };

    const noTodoContainerClasses =
      "flex items-center flex-grow justify-center rounded-md bg-gray-50 border";
    const withTodoContainerClasses =
      "flex-grow flex flex-col gap-4 overflow-y-scroll rounded-md bg-gray-50 p-2 border";

    const printTodo = (todoDiv, todoArray, project) => {
      if (!todoArray.length) {
        todoDiv.appendChild(getNoTodoDiv());
        todoDiv.className = noTodoContainerClasses;
      } else {
        todoDiv.className = withTodoContainerClasses;

        for (let i = 0; i < todoArray.length; i++) {
          todoDiv.appendChild(getTodoDiv(todoArray[i], project));
        }
      }
    };

    const getNoTodoDiv = () => {
      const noTodo = document.createElement("p");
      noTodo.textContent = "No Todo";
      noTodo.id = "noTodo";
      noTodo.className = "text-gray-500";

      return noTodo;
    };
    const getTodoDiv = (todoObj, project) => {
      const todoContainer = document.createElement("div");
      todoContainer.className = "border rounded-md p-4 bg-white";

      const row1 = document.createElement("div");
      row1.className = "flex justify-between gap-2 items-center";

      const checkBox = document.createElement("div");
      checkBox.id = "checkbox";
      checkBox.className =
        "w-4 min-w-[1rem] h-4 select-none bg-gray-100 border  rounded hover:bg-gray-200 transition cursor-pointer flex items-center justify-center";

      switch (parseInt(todoObj.priority)) {
        case -1:
          checkBox.classList.add("shadow-center-green");
          break;
        case 0:
          checkBox.classList.add("shadow-center-gray");
          break;
        case 1:
          checkBox.classList.add("shadow-center-red");
          break;
      }

      const checkBoxNoneActiveClasses = [
        "bg-gray-100",
        "border-gray-200",
        "hover:bg-gray-200",
      ];
      const checkBoxActiveClasses = [
        "bg-spl-blue",
        "border-[#0549C7]",
        "hover:bg-spl-blue/90",
      ];

      checkBox.addEventListener("click", () => {
        if (checkBox.innerHTML) {
          checkBoxNoneActive();
          editTodo(
            project,
            todoObj.id,
            todoObj.title,
            todoObj.description,
            todoObj.dueDate,
            todoObj.priority,
            false
          );
        } else {
          checkBoxActive();
          editTodo(
            project,
            todoObj.id,
            todoObj.title,
            todoObj.description,
            todoObj.dueDate,
            todoObj.priority,
            true
          );
        }
      });

      const title = document.createElement("p");
      title.textContent = todoObj.title;
      title.className = "font-bold flex-grow line-clamp-2";

      // Placed here to let title initialize -->
      const checkBoxNoneActive = () => {
        checkBoxActiveClasses.forEach((element) => {
          checkBox.classList.remove(element);
        });
        checkBoxNoneActiveClasses.forEach((element) => {
          checkBox.classList.add(element);
        });
        checkBox.innerHTML = "";

        title.classList.remove("line-through");
      };

      const checkBoxActive = () => {
        checkBoxNoneActiveClasses.forEach((element) => {
          checkBox.classList.remove(element);
        });
        checkBoxActiveClasses.forEach((element) => {
          checkBox.classList.add(element);
        });
        checkBox.innerHTML = `<svg id="checkbox" class="h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="checkbox" d="M6 12L10.2426 16.2426L18.727 7.75732" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

        title.classList.add("line-through");
      };

      if (todoObj.isDone) {
        checkBoxActive();
      } else {
        checkBoxNoneActive();
      }
      // <--

      const dueDate = document.createElement("p");
      dueDate.textContent = todoObj.dueDate;
      dueDate.className = "min-w-fit text-gray-400";

      row1.append(checkBox, title, dueDate);
      todoContainer.appendChild(row1);

      const description = document.createElement("p");
      if (todoObj.description) {
        description.innerHTML = todoObj.description.replace(/\n/g, "<br>");
        description.className = "text-sm text-gray-600 mt-2 line-clamp-2";
        todoContainer.appendChild(description);
      }

      const row3 = document.createElement("div");
      row3.className =
        "flex justify-center gap-8 h-0 overflow-hidden transition-all";

      const btnClasses =
        "text-white font-bold px-8 py-2 rounded-lg hover:shadow-lg w-fit transition";

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = btnClasses;
      editBtn.classList.add("bg-spl-blue");
      editBtn.classList.add("hover:shadow-spl-blue/30");

      editBtn.addEventListener("click", () => {
        const setDimensions = () => {
          overlay.style.width = todoDiv.offsetWidth + "px";
          overlay.style.height = todoDiv.offsetHeight + "px";
          overlay.style.top = todoDiv.offsetTop + "px";
          overlay.style.left = todoDiv.offsetLeft + "px";
        };

        const closeOverlay = () => {
          overlay.classList.remove("backdrop-blur");
          overlay.classList.add("opacity-0");

          setTimeout(() => {
            overlay.remove();
            todoDiv.classList.add("overflow-y-scroll");
            todoDiv.classList.remove("overflow-y-hidden");
          }, 500);
        };

        const todoDiv = document.getElementById("todoDiv");

        const renameForm = () => {
          const errorClass = "border-red-500";
          const container = document.createElement("div");
          container.className =
            "flex flex-col gap-4 w-full max-w-5xl h-full justify-center";

          const row1 = document.createElement("div");
          row1.className = "flex gap-4 h-10 w-full";

          const title = document.createElement("input");
          title.placeholder = "Title";
          title.value = todoObj.title;
          title.className =
            "flex-grow border rounded-md outline-none focus:border-spl-blue px-1";
          title.addEventListener("change", () => {
            title.classList.remove(errorClass);
          });

          const dueDate = document.createElement("input");
          dueDate.type = "date";
          dueDate.value = todoObj.dueDate;
          dueDate.className =
            "border rounded-md px-4 focus:border-spl-blue focus:outline-none cursor-pointer";
          dueDate.addEventListener("change", () => {
            dueDate.classList.remove(errorClass);
          });

          const priority = document.createElement("select");
          priority.className =
            "appearance-none px-4 bg-gray-100 rounded-md outline-none border focus:border-spl-blue cursor-pointer";

          const changePriorityUi = (priorityValue) => {
            switch (priorityValue) {
              case -1:
                priority.classList.add("bg-green-100");
                break;
              case 0:
                priority.classList.add("bg-gray-100");
                break;
              case 1:
                priority.classList.add("bg-red-100");
                break;
            }
          };

          priority.addEventListener("change", () => {
            var oldBg;

            priority.classList.forEach((e) => {
              if (e.startsWith("bg")) {
                oldBg = e;
              }
            });
            priority.classList.remove(oldBg);
            changePriorityUi(parseInt(priority.value));
          });

          const low = document.createElement("option");
          low.textContent = "Low";
          low.value = -1;

          const normal = document.createElement("option");
          normal.textContent = "Normal";
          normal.value = 0;

          const high = document.createElement("option");
          high.textContent = "High";
          high.value = 1;

          switch (parseInt(todoObj.priority)) {
            case -1:
              low.defaultSelected = true;
              break;
            case 0:
              normal.defaultSelected = true;
              break;
            case 1:
              high.defaultSelected = true;
              break;
          }
          changePriorityUi(parseInt(todoObj.priority));

          priority.append(low, normal, high);

          row1.append(title, dueDate, priority);

          const description = document.createElement("textarea");
          description.placeholder = "Description (Optional)";
          description.value = todoObj.description;
          description.className =
            "transition-all outline-none flex-grow min-h-[3.5rem] max-h-72 flex-grow p-1 border focus:border-spl-blue rounded-md resize-none";

          const buttonRow = document.createElement("div");
          buttonRow.className = "flex gap-4";

          const discardBtn = document.createElement("button");
          discardBtn.textContent = "Discard";
          discardBtn.className = btnClasses;
          discardBtn.classList.add("bg-red-500");
          discardBtn.classList.add("hover:shadow-red-500/30");

          discardBtn.addEventListener("click", () => {
            closeOverlay();
          });

          const saveBtn = document.createElement("button");
          saveBtn.textContent = "Save";
          saveBtn.className = btnClasses;
          saveBtn.classList.add("bg-spl-blue");
          saveBtn.classList.add("hover:shadow-spl-blue/30");

          saveBtn.addEventListener("click", () => {
            if (!title.value && !dueDate.value) {
              title.classList.add(errorClass);
              dueDate.classList.add(errorClass);
            } else if (!title.value) {
              title.classList.add(errorClass);
            } else if (!dueDate.value) {
              dueDate.classList.add(errorClass);
            } else {
              editTodo(
                project,
                todoObj.id,
                title.value,
                description.value,
                dueDate.value,
                priority.value,
                todoObj.isDone
              );

              Array.from(todoDiv.children).forEach((element) => {
                if (element !== overlay) {
                  element.remove();
                }
              });

              closeOverlay();

              printTodo(todoDiv, getTodoData()[project], project);
            }
          });

          buttonRow.append(discardBtn, saveBtn);

          container.append(row1, description, buttonRow);

          overlay.append(container);
        };

        todoDiv.classList.remove("overflow-y-scroll");
        todoDiv.classList.add("overflow-y-hidden");

        description.classList.add("line-clamp-2");

        const overlay = document.createElement("div");
        overlay.className =
          "absolute border bg-white/70 opacity-0 rounded-md transition duration-500 flex items-center justify-center p-12";
        setDimensions();

        window.addEventListener("resize", () => {
          setDimensions();
        });

        setTimeout(() => {
          overlay.classList.remove("opacity-0");
          overlay.classList.add("backdrop-blur");

          setTimeout(() => {
            row3.classList.add("h-0");
            row3.classList.add("overflow-hidden");
            row3.classList.remove("h-10");
            row3.classList.remove("mt-4");
          }, 250);

          document.addEventListener("click", function (e) {
            if (!overlay.contains(e.target)) {
              closeOverlay();
            }
          });
        }, 1);

        renameForm();

        todoDiv.appendChild(overlay);
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = btnClasses;
      deleteBtn.classList.add("bg-red-500");
      deleteBtn.classList.add("hover:shadow-red-500/30");

      deleteBtn.addEventListener("click", () => {
        deleteTodo(project, todoObj.id);
        todoContainer.remove();

        const todoDiv = document.getElementById("todoDiv");
        if (!todoDiv.hasChildNodes()) {
          todoDiv.className = noTodoContainerClasses;
          todoDiv.appendChild(getNoTodoDiv());
        }
      });

      row3.append(editBtn, deleteBtn);
      todoContainer.appendChild(row3);

      todoContainer.addEventListener("click", (e) => {
        if (e.target.id !== "checkbox") {
          row3.classList.remove("h-0");
          row3.classList.remove("overflow-hidden");
          row3.classList.add("h-10");

          if (description.textContent) {
            row3.classList.add("mt-4");
          }

          description.classList.remove("line-clamp-2");

          document.addEventListener("click", function (e) {
            if (
              !todoContainer.contains(e.target) &&
              e.target.id !== "checkbox"
            ) {
              row3.classList.add("h-0");
              row3.classList.add("overflow-hidden");
              row3.classList.remove("h-10");
              row3.classList.remove("mt-4");

              description.classList.add("line-clamp-2");
            }
          });
        }
      });

      return todoContainer;
    };

    const addTodoUi = (project, todoDiv) => {
      const errorClass = "border-red-500";
      const container = document.createElement("div");
      container.className = "flex flex-col w-full transition-all static";

      const row1 = document.createElement("div");
      row1.className = "flex gap-4";

      const title = document.createElement("input");
      title.placeholder = "Title";
      title.className =
        "flex-grow border rounded-md outline-none focus:border-spl-blue px-1";
      title.addEventListener("change", () => {
        title.classList.remove(errorClass);
      });

      const dueDate = document.createElement("input");
      dueDate.type = "date";
      dueDate.className =
        "border rounded-md px-4 focus:border-spl-blue focus:outline-none cursor-pointer";
      dueDate.addEventListener("change", () => {
        dueDate.classList.remove(errorClass);
      });

      const priority = document.createElement("select");
      priority.className =
        "appearance-none px-4 bg-gray-100 rounded-md outline-none border focus:border-spl-blue cursor-pointer";
      priority.addEventListener("change", () => {
        var oldBg;

        priority.classList.forEach((e) => {
          if (e.startsWith("bg")) {
            oldBg = e;
          }
        });

        switch (parseInt(priority.value)) {
          case -1:
            priority.classList.remove(oldBg);
            priority.classList.add("bg-green-100");
            break;
          case 0:
            priority.classList.remove(oldBg);
            priority.classList.add("bg-gray-100");
            break;
          case 1:
            priority.classList.remove(oldBg);
            priority.classList.add("bg-red-100");
            break;
        }
      });

      const low = document.createElement("option");
      low.textContent = "Low";
      low.value = -1;

      const normal = document.createElement("option");
      normal.textContent = "Normal";
      normal.value = 0;
      normal.selected = true;

      const high = document.createElement("option");
      high.textContent = "High";
      high.value = 1;

      priority.append(low, normal, high);
      const btnClasses =
        "bg-spl-blue border border-[#0549C7] hover:bg-spl-blue/95 aspect-square w-10 h-10 flex items-center justify-center";

      const buttonsContainer = document.createElement("div");
      buttonsContainer.className = "flex rounded-md overflow-hidden";

      const addBtn = document.createElement("button");
      addBtn.innerHTML = `<svg class="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      addBtn.className = btnClasses;
      addBtn.classList.add("rounded-l-md");

      const openBtn = document.createElement("button");
      openBtn.innerHTML = `<svg class="w-6 h-6 -rotate-0 transition-transform" id="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M19 9L12 16L5 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      openBtn.className = btnClasses;
      openBtn.classList.add("rounded-r-md");

      buttonsContainer.append(addBtn, openBtn);

      row1.append(title, dueDate, priority, buttonsContainer);

      const row2 = document.createElement("div");
      row2.className = "flex gap-4 h-0 overflow-hidden transition-all";

      const description = document.createElement("textarea");
      description.placeholder = "Description (Optional)";
      description.className =
        "transition-all outline-none flex-grow p-1 border focus:border-spl-blue rounded-md resize-none";

      row2.append(description);

      container.append(row1, row2);

      const row2OpenClasses = ["h-[7.75rem]", "mt-4"];

      var isDescriptionOpen = false;

      openBtn.addEventListener("click", (e) => {
        const icon = document.getElementById("arrow");
        if (isDescriptionOpen) {
          row2OpenClasses.forEach((element) => {
            row2.classList.remove(element);
          });

          icon.classList.add("-rotate-0");
          icon.classList.remove("-rotate-180");
          isDescriptionOpen = false;
        } else {
          row2OpenClasses.forEach((element) => {
            row2.classList.add(element);
          });

          icon.classList.remove("-rotate-0");
          icon.classList.add("-rotate-180");
          isDescriptionOpen = true;
        }
      });

      const resetInputs = () => {
        var oldBg;

        priority.classList.forEach((e) => {
          if (e.startsWith("bg")) {
            oldBg = e;
          }
        });

        title.value = "";
        description.value = "";
        dueDate.value = "";
        priority.value = "0";
        priority.classList.remove(oldBg);
        priority.classList.add("bg-gray-100");
      };

      addBtn.addEventListener("click", () => {
        if (!title.value && !dueDate.value) {
          title.classList.add(errorClass);
          dueDate.classList.add(errorClass);
        } else if (!title.value) {
          title.classList.add(errorClass);
        } else if (!dueDate.value) {
          dueDate.classList.add(errorClass);
        } else {
          row2OpenClasses.forEach((element) => {
            row2.classList.remove(element);
          });

          const icon = document.getElementById("arrow");
          icon.classList.add("-rotate-0");
          icon.classList.remove("-rotate-180");

          addTodo(
            project,
            title.value,
            description.value,
            dueDate.value,
            priority.value
          );

          newTodoDiv(getTodoData()[project].slice(-1)[0], project, todoDiv);

          resetInputs();
        }
      });

      return container;
    };

    const newTodoDiv = (todoObj, project, todoDiv) => {
      if (todoDiv.querySelector("#noTodo")) {
        todoDiv.innerHTML = "";
        todoDiv.className = withTodoContainerClasses;
        todoDiv.appendChild(getTodoDiv(todoObj, project));
      } else {
        todoDiv.appendChild(getTodoDiv(todoObj, project));
      }
    };

    const homeView = () => {
      const todoData = getTodoData();
      const content = document.getElementById("content");
      content.className =
        "flex flex-col w-full h-full mr-4 gap-4 overflow-x-visible transition";

      const yourProjects = document.createElement("h1");
      yourProjects.textContent = `Your Projects (${
        Object.keys(todoData).length
      })`;
      yourProjects.className = "text-5xl font-thin";

      const sortedArray = this.getProjectNamesSorted();

      const projectsContainer = document.createElement("div");
      projectsContainer.className = "w-full overflow-x-scroll flex-shrink-0";

      const projects = document.createElement("div");
      projects.className = "flex gap-2";

      for (let i = 0; i < sortedArray.length; i++) {
        const project = document.createElement("div");
        project.className =
          "flex gap-2 items-center whitespace-nowrap bg-gray-100 focus:bg-gray-200 hover:bg-gray-200 transition text-black font-medium text-sm border-black py-2 px-5 rounded-xl cursor-pointer select-none";

        const projectName = document.createElement("p");
        projectName.textContent = this.getProjectNameOnly(sortedArray[i]);
        projectName.className = "w-max";

        project.append(projectName);
        project.addEventListener("click", () => {
          openProject(sortedArray[i]);
        });
        projects.appendChild(project);
      }

      projectsContainer.appendChild(projects);

      this.getTodoOnly();

      const innerContent = document.createElement("div");
      innerContent.className = "flex-grow flex";

      const todoOnly = this.getTodoOnly();

      if (!todoOnly.length) {
        const noTodo = document.createElement("div");
        noTodo.className =
          "flex flex-col items-center justify-center flex-grow gap-12 text-gray-500";

        const noTodoP = document.createElement("p");
        noTodoP.textContent =
          "You don't have any todo, add one by going into a project.";

        const arrow = document.createElement("div");
        arrow.innerHTML = `<svg class="h-full w-full" width="435" height="90" viewBox="0 0 435 90" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M431 10.5926C406.574 30.115 387.281 38.379 355.944 36.9914C327.646 35.7383 296.863 22.3483 270.544 12.5909C237.957 0.510424 173.992 -8.93118 155.057 29.524C140.355 59.3834 162.392 95.0893 197.071 85.3717C210.441 81.6253 217.35 63.8425 211.428 51.5055C205.032 38.1805 185.91 31.7568 172.686 28.6826C137.171 20.4264 113.511 53.572 81.374 59.3935C51.3497 64.8323 29.0541 51.4325 6.31842 33.3103C4.37095 31.758 5.36837 42.086 5.36837 44.6691C5.36837 54.1386 3.46812 49.9358 3.46812 42.776C3.46812 38.1712 1.03353 28.3808 7.26849 30.9964C11.7668 32.8834 21.2221 33.3103 26.2699 33.3103" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>`;
        arrow.className = "w-[50vw] h-auto";

        noTodo.append(noTodoP, arrow);

        innerContent.appendChild(noTodo);
      } else {
        innerContent.className =
          "flex-grow flex flex-col gap-4 border rounded-md bg-gray-50 w-full p-2 overflow-y-scroll";
        let sorted = _.orderBy(
          _.filter(todoOnly, (element) => {
            return !element.isDone;
          }),
          ["dueDate", "priority", "title"],
          ["asc", "desc", "asc"]
        );

        if (sorted.length) {
          sorted.forEach((element) => {
            innerContent.appendChild(getViewTodoDiv(element));
          });
        } else {
          nothingViewTodo(innerContent);
        }
      }
      this.changeContent(yourProjects, projectsContainer, innerContent);
    };

    const todayView = () => {
      const todoOnly = this.getTodoOnly();
      let sorted = _.orderBy(
        _.filter(todoOnly, (element) => {
          return (
            element.dueDate === new Date().toJSON().slice(0, 10) &&
            !element.isDone
          );
        }),
        ["priority", "title"],
        ["desc", "asc"]
      );
      getViewUi(sorted, "Today");
    };

    const pastView = () => {
      const todoOnly = this.getTodoOnly();
      let sorted = _.orderBy(
        _.filter(todoOnly, (element) => {
          return (
            element.dueDate < new Date().toJSON().slice(0, 10) &&
            !element.isDone
          );
        }),
        ["priority", "title"],
        ["desc", "asc"]
      );
      getViewUi(sorted, "Past");
    };

    const weekView = () => {
      const todoOnly = this.getTodoOnly();

      Date.prototype.getWeek = function () {
        var oneJan = new Date(this.getFullYear(), 0, 1);
        var today = new Date(
          this.getFullYear(),
          this.getMonth(),
          this.getDate()
        );
        var dayOfYear = (today - oneJan + 86400000) / 86400000;
        return Math.ceil(dayOfYear / 7);
      };

      let sorted = _.orderBy(
        _.filter(todoOnly, (element) => {
          return (
            new Date(element.dueDate).getWeek() === new Date().getWeek() &&
            new Date(element.dueDate).getFullYear() ===
              new Date().getFullYear() &&
            !element.isDone
          );
        }),
        ["priority", "title"],
        ["desc", "asc"]
      );
      getViewUi(sorted, "This Week");
    };

    const monthView = () => {
      const todoOnly = this.getTodoOnly();
      let sorted = _.orderBy(
        _.filter(todoOnly, (element) => {
          return (
            new Date(element.dueDate).getMonth() === new Date().getMonth() &&
            new Date(element.dueDate).getFullYear() ===
              new Date().getFullYear() &&
            !element.isDone
          );
        }),
        ["priority", "title"],
        ["desc", "asc"]
      );
      getViewUi(sorted, "This Month");
    };

    const getViewUi = (array, name) => {
      const heading = document.createElement("p");
      heading.textContent = `${name} (${array.length})`;
      heading.className = "text-5xl font-thin";

      const todoContainer = document.createElement("div");
      todoContainer.className =
        "flex-grow overflow-y-scroll border bg-gray-50 rounded-md p-2 flex flex-col gap-4";

      if (array.length) {
        array.forEach((element) => {
          todoContainer.appendChild(getViewTodoDiv(element));
        });
      } else {
        nothingViewTodo(todoContainer);
      }

      this.changeContent(heading, todoContainer);
    };

    const nothingViewTodo = (todoContainer) => {
      todoContainer.classList.add("items-center");
      todoContainer.classList.add("justify-center");

      const nothing = document.createElement("p");
      nothing.textContent = "Nothing here";
      nothing.className = "font-semibold text-gray-500";

      todoContainer.appendChild(nothing);
    };

    const getViewTodoDiv = (element) => {
      const row1 = document.createElement("div");
      row1.className = "flex gap-2 items-center";

      const priority = document.createElement("div");
      priority.className = "h-4 w-4 rounded-full";

      switch (parseInt(element.priority)) {
        case -1:
          priority.classList.add("bg-green-500");
          break;
        case 0:
          priority.classList.add("bg-gray-500");
          break;
        case 1:
          priority.classList.add("bg-red-500");
          priority.classList.add("animate-pulse");
          break;
      }

      const todo = document.createElement("div");
      todo.className = "p-4 bg-white border rounded-md transition-all";

      const title = document.createElement("p");
      title.textContent = element.title;
      title.className = "font-bold flex-grow";

      const rightContainer = document.createElement("div");

      const dueDate = document.createElement("p");
      dueDate.textContent = element.dueDate;
      dueDate.className = "text-gray-400 text-sm";

      const project = document.createElement("p");
      project.textContent = this.getProjectNameOnly(element.project);
      project.className = "text-gray-400 text-sm text-right";

      rightContainer.append(dueDate, project);

      row1.append(priority, title, rightContainer);
      todo.appendChild(row1);

      if (element.description) {
        const description = document.createElement("p");
        description.innerHTML = element.description.replace(/\n/g, "<br>");
        description.className = "text-sm text-gray-600 mt-2 line-clamp-2";

        todo.addEventListener("click", () => {
          description.classList.remove("line-clamp-2");

          window.addEventListener("click", (e) => {
            if (!todo.contains(e.target)) {
              description.classList.add("line-clamp-2");
            }
          });
        });

        todo.appendChild(description);
      }

      return todo;
    };

    topBarUi();
    sideBar();
    addBackdrop();
    homeView();
  }

  static changeContent(...args) {
    const contentContainer = document.getElementById("contentContainer");
    const content = document.getElementById("content");

    contentContainer.classList.add("blur-md");
    contentContainer.classList.add("opacity-25");

    setTimeout(() => {
      content.innerHTML = "";
      args.forEach((element) => {
        content.append(element);
      });
      contentContainer.classList.remove("opacity-25");
      contentContainer.classList.remove("blur-md");
    }, 150);
  }

  static newEmojiSelector(emojiSelectorContainer, emojiP) {
    const changeEmoji = (emoji) => {
      emojiP.textContent = emoji["native"];
      removeEmojiPicker();
    };
    const pickerOptions = {
      onEmojiSelect: changeEmoji,
      previewPosition: "none",
      dynamicWidth: "true",
    };

    const picker = new Picker(pickerOptions);
    picker.id = "emojiSelector";
    picker.className = "w-full transition-all opacity-100";
    emojiSelectorContainer.appendChild(picker);

    setTimeout(() => {
      window.addEventListener(
        "click",
        (e) => {
          if (
            e.target.id !== "emojiSelector" &&
            emojiSelectorContainer.innerHTML
          )
            removeEmojiPicker();
        },
        1
      );
    });

    const removeEmojiPicker = () => {
      picker.classList.remove("opacity-100");
      picker.classList.add("opacity-0");
      picker.classList.add("scale-y-0");
      setTimeout(() => {
        emojiSelectorContainer.innerHTML = "";
      }, 150);
    };
  }

  static randomColorPastel = () => {
    function hslToHex(h, s, l) {
      l /= 100;
      const a = (s * Math.min(l, 1 - l)) / 100;
      const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
          .toString(16)
          .padStart(2, "0");
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    }
    return hslToHex(Math.floor(Math.random() * 360), 75, 90);
  };

  static getProjectNamesSorted() {
    const todoData = getTodoData();
    const onlyNameArray = [];
    Object.keys(todoData).forEach((key) => {
      onlyNameArray.push(key);
    });
    const sortedKeyArray = onlyNameArray.sort((a, b) =>
      this.getProjectNameOnly(a)
        .trim()
        .toLowerCase()
        .localeCompare(
          this.getProjectNameOnly(b).trim().toLowerCase(),
          undefined,
          { sensitivity: "base" }
        )
    );
    return sortedKeyArray;
  }

  static getTodoOnly() {
    const todoData = getTodoData();
    var todo = [];
    Object.keys(todoData).forEach((key) => {
      todoData[key].forEach((obj) => {
        obj["project"] = key;
        todo.push(obj);
      });
    });
    // todo = _.sortBy(todo, ["title"]); //May be changed      //NOW DISABLED
    return todo;
  }

  static getProjectNameEmoji(name) {
    return name.replace(emojiRegex, "");
  }

  static getProjectNameOnly(name) {
    return name.replace(projectNameRegex, "");
  }

  static initialInsertions() {
    this.desktopUi();
  }
}
