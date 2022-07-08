<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::create(
            [
                'category_id' => "1",
                'meta_title' => " XIAOMI Redmi 10",
                'meta_keyword' => "XIAOMI Redmi 10",
                'meta_description' => "XIAOMI Redmi 10",
                'slug' => "XIAOMI Redmi 10",
                'name' => "XIAOMI Redmi 10",
                'description' => "128GB Akıllı Telefon Mavi.",
                'brand' => "XIAOMI",
                'selling_price' => "4999",
                'original_price' => "4999",
                'quantity' => "500",
                'image' => "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_93173979/fee_325_225_png/XIAOMI-Redmi-10-128GB-Ak%C4%B1ll%C4%B1-Telefon-Mavi",
                'status' => "0",
                'popular' => "0",
                'featured' => "1"
            ]
        );
        Product::create(
            [
                'category_id' => "1",
                'meta_title' => "SAMSUNG Galaxy A53",
                'meta_keyword' => "SAMSUNG Galaxy A53",
                'meta_description' => "SAMSUNG Galaxy A53",
                'slug' => "SAMSUNG Galaxy A53",
                'name' => "SAMSUNG Galaxy A53",
                'description' => "128GB Akıllı Telefon Siyah",
                'brand' => "SAMSUNG",
                'selling_price' => "7899",
                'original_price' => "7899",
                'quantity' => "500",
                'image' => "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_92482378/fee_325_225_png/SAMSUNG-Galaxy-A53-128GB-Ak%C4%B1ll%C4%B1-Telefon-Siyah",
                'status' => "0",
                'popular' => "0",
                'featured' => "1"
            ]
        );
        Product::create(
            [
                'category_id' => "1",
                'meta_title' => "APPLE iPhone 11",
                'meta_keyword' => "APPLE iPhone 11",
                'meta_description' => "APPLE iPhone 11",
                'slug' => "APPLE iPhone 11",
                'name' => "APPLE iPhone 11",
                'description' => "64GB Akıllı Telefon Siyah",
                'brand' => "APPLE",
                'selling_price' => "14999",
                'original_price' => "14999",
                'quantity' => "500",
                'image' => "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_79133337/wcs_overlay_prod_detail/APPLE-iPhone-11-64GB-Ak%C4%B1ll%C4%B1-Telefon-Siyah",
                'status' => "0",
                'popular' => "0",
                'featured' => "1"
            ]
        );
        Product::create(
            [
                'category_id' => "2",
                'meta_title' => "APPLE MGNA3TU/A MacBook Air",
                'meta_keyword' => "APPLE MGNA3TU/A MacBook Air",
                'meta_description' => "APPLE MGNA3TU/A MacBook Air",
                'slug' => "APPLE MGNA3TU/A MacBook Air",
                'name' => "APPLE MGNA3TU/A MacBook Air",
                'description' => "13.3 Apple M1/512GB SSD/ Laptop Silver",
                'brand' => "APPLE",
                'selling_price' => "24999",
                'original_price' => "24999",
                'quantity' => "500",
                'image' => "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_89672052/fee_325_225_png/APPLE-MGNA3TU-A-MacBook-Air-13.3%22-Apple-M1-512GB-SSD--Laptop-Silver",
                'status' => "0",
                'popular' => "0",
                'featured' => "1"
            ]
        );
        Product::create(
            [
                'category_id' => "2",
                'meta_title' => "HUAWEI Matebook D15",
                'meta_keyword' => "HUAWEI Matebook D15",
                'meta_description' => "HUAWEI Matebook D15",
                'slug' => "HUAWEI Matebook D15",
                'name' => "HUAWEI Matebook D15",
                'description' => "Intel Core i5-1135G7/8GB RAM/512GB SSD/15.6/W11 Laptop Gri",
                'brand' => "HUAWEI",
                'selling_price' => "9999",
                'original_price' => "9999",
                'quantity' => "500",
                'image' => "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_94528408/wcs_overlay_prod_detail/HUAWEI-Matebook-D15-Intel-Core-i5-1135G7-8GB-RAM-512GB-SSD-15.6%22-W11-Laptop-Gri",
                'status' => "0",
                'popular' => "0",
                'featured' => "1"
            ]
        );
        Product::create(
            [
                'category_id' => "2",
                'meta_title' => "CASPER Excalibur G911.1180-DQ80A-C",
                'meta_keyword' => "CASPER Excalibur G911.1180-DQ80A-C",
                'meta_description' => "CASPER Excalibur G911.1180-DQ80A-C",
                'slug' => "CASPER Excalibur G911.1180-DQ80A-C",
                'name' => "CASPER Excalibur G911.1180-DQ80A-C",
                'description' => "i7-11800H/32GB RAM/1TB SSD/16GB RTX 3080/16/Win 11 Gaming Laptop Gri Metal",
                'brand' => "CASPER",
                'selling_price' => "41999",
                'original_price' => "41999",
                'quantity' => "500",
                'image' => "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_90884540/fee_325_225_png/CASPER-Excalibur-G911.1180-DQ80A-C-i7-11800H-32GB-RAM-1TB-SSD-16GB-RTX-3080-16%22-Win-11-Gaming-Laptop-Gri-Metal",
                'status' => "0",
                'popular' => "0",
                'featured' => "1"
            ]
        );

        Product::create(
            [
                'category_id' => "3",
                'meta_title' => "DJI Action 2",
                'meta_keyword' => "DJI Action 2",
                'meta_description' => "DJI Action 2",
                'slug' => "DJI Action 2",
                'name' => "DJI Action 2",
                'description' => "Çift Ekran Combo Aksiyon Kamera",
                'brand' => "DJI",
                'selling_price' => "8999",
                'original_price' => "8999",
                'quantity' => "500",
                'image' => "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_89009673/fee_325_225_png/DJI-Action-2-%C3%87ift-Ekran-Combo-Aksiyon-Kamera",
                'status' => "0",
                'popular' => "0",
                'featured' => "1"
            ]
        );
        Product::create(
            [
                'category_id' => "3",
                'meta_title' => "FUJIFILM Instax SQ1",
                'meta_keyword' => "FUJIFILM Instax SQ1",
                'meta_description' => "FUJIFILM Instax SQ1",
                'slug' => "FUJIFILM Instax SQ1",
                'name' => "FUJIFILM Instax SQ1",
                'description' => "Glacier Blue EX D Anlık Kamera Mavi",
                'brand' => "FUJIFILM",
                'selling_price' => "1999",
                'original_price' => "1999",
                'quantity' => "500",
                'image' => "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_93222718/wcs_overlay_prod_detail/FUJIFILM-Instax-SQ1-Glacier-Blue-EX-D-Anl%C4%B1k-Kamera-Mavi",
                'status' => "0",
                'popular' => "0",
                'featured' => "1"
            ]
        );
        Product::create(
            [
                'category_id' => "3",
                'meta_title' => "NIKON D3500",
                'meta_keyword' => "NIKON D3500",
                'meta_description' => "NIKON D3500",
                'slug' => "NIKON D3500",
                'name' => "NIKON D3500",
                'description' => "AF-P 18-55 VR KIT Dijital Kamera",
                'brand' => "NIKON",
                'selling_price' => "9599",
                'original_price' => "9599",
                'quantity' => "500",
                'image' => "https://assets.mmsrg.com/isr/166325/c1/-/pixelboxx-mss-79731863/wcs_overlay_prod_detail/NIKON-D3500--AF-P-18-55-VR-KIT-Dijital-Kamera",
                'status' => "0",
                'popular' => "0",
                'featured' => "1"
            ]
        );
    }
}
