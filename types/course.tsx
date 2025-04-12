export interface courseSchema {
id: number;
title: string;
level: string;
language: string;
duration: number;
trending: string;
short_video_url: string;
old_price: number;
price: number;
image_url: string;
content: courseContent;
category_id: number;
user_id: number;

}

export interface courseContent {
about: string;
curriculum: string;
requirements: string;
outcomes: string;
}


export interface categorySchema {
id: number;
 name: string;
}

