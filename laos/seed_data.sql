-- ============================================================
-- SEED DATA - Laos Travel
-- Chạy file này trong MySQL để thêm dữ liệu mẫu
-- ============================================================

USE laostravel;

-- ============================================================
-- DESTINATIONS (6 địa điểm, dùng category_id có sẵn: 1-5)
-- ============================================================
INSERT IGNORE INTO destinations (name, slug, short_description, description, province, thumbnail, category_id, status, created_at, view_count) VALUES

('Luang Prabang',
 'luang-prabang',
 'Thành phố cổ kính được UNESCO công nhận, nổi tiếng với những ngôi chùa vàng và phố cổ bên sông Mekong.',
 'Luang Prabang là cố đô của Lào, được UNESCO công nhận là Di sản Thế giới vào năm 1995. Thành phố nằm ở ngã ba sông Mekong và sông Nam Khan, bao quanh bởi những ngọn núi xanh mướt. Nơi đây nổi tiếng với hơn 30 ngôi chùa cổ kính, trong đó Wat Xieng Thong là đẹp nhất. Mỗi buổi sáng sớm, du khách có thể chứng kiến nghi lễ dâng cơm (Tak Bat) của các nhà sư mặc áo vàng rực rỡ. Phố cổ với những ngôi nhà kiến trúc Pháp-Lào xen lẫn tạo nên vẻ đẹp độc đáo không nơi nào có được.',
 'Tỉnh Luang Prabang',
 '/uploads/destinations/2/thumbnail.jpg',
 4, 'ACTIVE', NOW(), 0),

('Vientiane',
 'vientiane',
 'Thủ đô yên bình của Lào với kiến trúc Pháp-Lào độc đáo, bảo tàng phong phú và cuộc sống nhẹ nhàng bên sông Mekong.',
 'Vientiane là thủ đô và thành phố lớn nhất của Lào, nằm bên bờ sông Mekong. Đây là một trong những thủ đô yên tĩnh và nhỏ nhất ở Đông Nam Á, mang lại cảm giác thư thái khác biệt so với các thành phố lớn trong khu vực. Điểm nhấn của thành phố là Pha That Luang - biểu tượng quốc gia của Lào, một tháp vàng rực rỡ được xây dựng từ thế kỷ 16. Patuxai - Khải Hoàn Môn của Lào - là công trình kiến trúc ấn tượng khác không thể bỏ qua. Dọc bờ sông Mekong có con đường đi bộ tuyệt đẹp, lý tưởng để ngắm hoàng hôn.',
 'Thủ đô Vientiane',
 '/uploads/destinations/3/thumbnail.jpg',
 4, 'ACTIVE', NOW(), 0),

('Thác Kuang Si',
 'thac-kuang-si',
 'Thác nước ba tầng huyền ảo với làn nước xanh ngọc bích, cách Luang Prabang 29km - điểm đến không thể bỏ qua.',
 'Thác Kuang Si là một trong những thác nước đẹp nhất Đông Nam Á, nằm cách trung tâm Luang Prabang khoảng 29km về phía nam. Thác có ba tầng chính với chiều cao tổng cộng khoảng 60m, nước chảy qua các tầng đá vôi tạo thành những hồ bơi tự nhiên với màu xanh ngọc bích tuyệt đẹp. Du khách có thể tắm trong các hồ nước mát lạnh, đi bộ theo đường mòn lên đỉnh thác để ngắm toàn cảnh, hoặc ghé thăm trung tâm cứu hộ gấu Asiatic Black Bear ngay gần đó. Thời điểm đẹp nhất để thăm thác là từ tháng 10 đến tháng 2.',
 'Tỉnh Luang Prabang',
 '/uploads/destinations/4/thumbnail.jpg',
 2, 'ACTIVE', NOW(), 0),

('Vang Vieng',
 'vang-vieng',
 'Thị trấn phiêu lưu nằm giữa những núi đá vôi hùng vĩ, nổi tiếng với kayaking, leo núi và hang động kỳ bí.',
 'Vang Vieng là thị trấn du lịch nằm bên bờ sông Nam Song, bao quanh bởi những dãy núi đá vôi hùng vĩ tạo nên khung cảnh thiên nhiên ngoạn mục. Đây là thiên đường cho những người yêu thích hoạt động ngoài trời: kayaking trên sông, leo núi, đi xe đạp qua những cánh đồng lúa xanh mướt, hay khám phá các hang động như Tham Jang, Tham Phu Kham với hồ nước xanh trong vắt bên trong. Những năm gần đây, Vang Vieng đã phát triển thành điểm đến cân bằng giữa phiêu lưu và thư giãn, với nhiều resort đẹp nhìn ra núi non hùng vĩ.',
 'Tỉnh Vientiane',
 '/uploads/destinations/5/thumbnail.jpg',
 2, 'ACTIVE', NOW(), 0),

('Wat Xieng Thong',
 'wat-xieng-thong',
 'Ngôi chùa hoàng gia đẹp nhất Lào tại Luang Prabang, kiệt tác kiến trúc Phật giáo với mái cong chạm đất và khảm kính rực rỡ.',
 'Wat Xieng Thong (Chùa Thành phố Vàng) được xây dựng năm 1560 dưới triều vua Setthathirath, là ngôi chùa quan trọng và đẹp nhất trong số hơn 30 ngôi chùa tại Luang Prabang. Chùa nằm ở đầu bán đảo nơi sông Mekong và sông Nam Khan gặp nhau. Kiến trúc đặc trưng với mái cong nhiều tầng chạm gần đến mặt đất, được trang trí bằng những mảnh kính màu ghép thành tranh mô tả cây sự sống và các cảnh trong thần thoại Phật giáo. Đây là nơi diễn ra nhiều nghi lễ hoàng gia quan trọng và là điểm tham quan không thể bỏ qua khi đến Luang Prabang.',
 'Tỉnh Luang Prabang',
 '/uploads/destinations/6/thumbnail.jpg',
 3, 'ACTIVE', NOW(), 0),

('Quần đảo 4000 Đảo (Si Phan Don)',
 'si-phan-don-4000-dao',
 'Quần đảo huyền bí trên sông Mekong ở cực nam Lào, nơi thời gian như ngừng trôi với những làng chài yên bình và thác Khone Phapheng hùng vĩ.',
 'Si Phan Don, hay còn gọi là 4000 Đảo, là một quần đảo nằm trên sông Mekong thuộc tỉnh Champasak, cực nam của Lào. Tên gọi xuất phát từ hàng nghìn hòn đảo lớn nhỏ xuất hiện trong mùa khô khi mực nước sông hạ thấp. Ba đảo chính được du khách ghé thăm là Don Khon, Don Det và Don Khong. Nơi đây nổi tiếng với thác Khone Phapheng - thác nước rộng nhất Đông Nam Á, và là một trong số ít nơi trên thế giới có thể ngắm cá heo sông Irrawaddy đang có nguy cơ tuyệt chủng. Cuộc sống trên đảo diễn ra chậm rãi, yên bình với những chiếc võng mắc giữa hàng dừa và tiếng sóng nước êm đềm.',
 'Tỉnh Champasak',
 '/uploads/destinations/7/thumbnail.jpg',
 2, 'ACTIVE', NOW(), 0);

-- ============================================================
-- FESTIVALS (4 lễ hội)
-- ============================================================
INSERT IGNORE INTO festivals (name, slug, short_description, description, province, thumbnail, start_date, end_date, status, created_at, view_count) VALUES

('Tết Bunpimay (Năm Mới Lào)',
 'tet-bunpimay',
 'Lễ hội Năm Mới lớn nhất của người Lào diễn ra vào tháng 4, với những màn té nước vui nhộn và nghi lễ tắm tượng Phật thiêng liêng.',
 'Bunpimay là lễ hội Năm Mới truyền thống của người Lào, thường diễn ra từ ngày 13 đến 15 tháng 4 hàng năm theo lịch Phật giáo. Đây là lễ hội lớn nhất và vui nhộn nhất trong năm, kéo dài khoảng 3 ngày với nhiều hoạt động đặc sắc. Điểm nhấn của lễ hội là tục té nước - người dân và du khách té nước vào nhau như một cách chúc phúc, rửa trôi điều xui xẻo của năm cũ và đón chào năm mới. Ngoài ra còn có nghi lễ tắm tượng Phật bằng nước thơm, diễu hành trên đường phố, biểu diễn âm nhạc truyền thống và các trò chơi dân gian. Luang Prabang là nơi tổ chức lễ hội hoành tráng và đặc sắc nhất.',
 'Toàn quốc',
 '/uploads/festivals/1/thumbnail.jpg',
 '2026-04-13', '2026-04-15',
 'ACTIVE', NOW(), 0),

('Lễ hội Thạt Luổng (That Luang)',
 'le-hoi-that-luang',
 'Lễ hội Phật giáo lớn nhất Lào tổ chức tại tháp vàng Pha That Luang ở Vientiane, thu hút hàng chục nghìn người hành hương mỗi năm.',
 'Lễ hội Thạt Luổng (Boun That Luang) là lễ hội tôn giáo và văn hóa lớn nhất của Lào, diễn ra vào tháng 11 hàng năm tại khuôn viên tháp vàng Pha That Luang - biểu tượng quốc gia của Lào ở Vientiane. Lễ hội kéo dài khoảng một tuần với nhiều hoạt động phong phú: các nhà sư và người dân từ khắp nơi đổ về hành hương, dâng lễ vật và cầu nguyện. Ban đêm, hàng nghìn ngọn nến và đèn lồng được thắp sáng tạo nên khung cảnh huyền ảo lung linh. Ngoài phần lễ, còn có hội chợ thương mại, biểu diễn nghệ thuật truyền thống, đua thuyền và các trò chơi dân gian thu hút đông đảo du khách trong và ngoài nước.',
 'Vientiane',
 '/uploads/festivals/2/thumbnail.jpg',
 '2026-11-10', '2026-11-17',
 'ACTIVE', NOW(), 0),

('Lễ hội Đèn Lồng (Boun Lai Heua Fai)',
 'le-hoi-den-long-boun-lai-heua-fai',
 'Lễ hội thả thuyền đèn lồng lung linh trên sông Mekong vào cuối mùa mưa, một trong những cảnh tượng đẹp nhất ở Lào.',
 'Boun Lai Heua Fai (Lễ hội Thả Thuyền Lửa) là một trong những lễ hội đẹp nhất và lãng mạn nhất của Lào, diễn ra vào cuối tháng 10 hoặc đầu tháng 11 theo lịch âm, đánh dấu sự kết thúc của mùa mưa và mùa chay Phật giáo (Ok Phansa). Trong đêm lễ hội, người dân thả những chiếc thuyền nhỏ làm từ lá chuối, được trang trí bằng hoa, nến và hương thơm xuống sông Mekong. Hàng nghìn chiếc thuyền đèn lung linh trôi theo dòng nước tạo nên cảnh tượng huyền ảo như trong cổ tích. Luang Prabang và Vientiane là hai nơi tổ chức lễ hội này đặc sắc nhất, thu hút đông đảo du khách quốc tế.',
 'Luang Prabang, Vientiane',
 '/uploads/festivals/3/thumbnail.jpg',
 '2026-10-20', '2026-10-21',
 'ACTIVE', NOW(), 0),

('Lễ hội Đua Thuyền (Boun Souang Heua)',
 'le-hoi-dua-thuyen-boun-souang-heua',
 'Cuộc đua thuyền truyền thống sôi động trên sông Mekong, diễn ra sau mùa mưa với sự tham gia của hàng trăm đội thuyền từ khắp cả nước.',
 'Boun Souang Heua (Lễ hội Đua Thuyền) là lễ hội thể thao truyền thống quan trọng của Lào, thường diễn ra vào tháng 10 sau khi mùa mưa kết thúc và mực nước sông dâng cao. Lễ hội được tổ chức tại nhiều tỉnh thành trên cả nước, nhưng lớn nhất là ở Vientiane trên sông Mekong. Hàng trăm đội thuyền với những chiếc thuyền dài được sơn màu sặc sỡ, mỗi thuyền có từ 50-60 tay chèo, thi đấu trong tiếng trống, tiếng hò reo cổ vũ của hàng nghìn khán giả. Ngoài phần thi đấu, lễ hội còn có các hoạt động văn hóa, ẩm thực và giải trí phong phú bên bờ sông, tạo nên không khí lễ hội sôi động và đặc sắc.',
 'Vientiane, Luang Prabang',
 '/uploads/festivals/4/thumbnail.jpg',
 '2026-10-05', '2026-10-07',
 'ACTIVE', NOW(), 0);

-- ============================================================
-- ARTICLES (3 bài viết, author_id = 2 là admin)
-- ============================================================
INSERT IGNORE INTO articles (title, slug, summary, content, thumbnail, author_id, status, created_at, view_count) VALUES

('Kinh nghiệm du lịch Lào tự túc từ A đến Z',
 'kinh-nghiem-du-lich-lao-tu-tuc',
 'Hướng dẫn chi tiết về cách du lịch Lào tự túc với ngân sách hợp lý: từ visa, vé máy bay, phương tiện di chuyển đến chỗ ở và ẩm thực.',
 'Du lịch Lào tự túc ngày càng trở nên phổ biến với du khách Việt Nam nhờ khoảng cách gần, chi phí hợp lý và sự thân thiện của người dân địa phương. Bài viết này tổng hợp đầy đủ kinh nghiệm để bạn có thể lên kế hoạch chuyến đi hoàn hảo.\n\nVISA: Công dân Việt Nam được miễn visa khi nhập cảnh Lào trong vòng 30 ngày. Bạn chỉ cần mang theo hộ chiếu còn hạn ít nhất 6 tháng.\n\nDI CHUYỂN: Có nhiều cách để đến Lào từ Việt Nam: bay thẳng từ Hà Nội hoặc TP.HCM đến Vientiane hoặc Luang Prabang; đi xe khách qua các cửa khẩu như Cầu Treo (Hà Tĩnh), Lao Bảo (Quảng Trị); hoặc đi tàu hỏa từ Trung Quốc qua Lào.\n\nCHI PHÍ: Lào là điểm đến khá rẻ. Bữa ăn tại nhà hàng địa phương chỉ từ 20.000-50.000 kip (khoảng 25.000-60.000 VNĐ). Phòng khách sạn 2 sao từ 150.000-300.000 kip/đêm.\n\nTHỜI ĐIỂM: Tháng 11 đến tháng 3 là mùa khô, thời tiết mát mẻ, lý tưởng nhất để du lịch Lào.',
 '/uploads/articles/1/thumbnail.jpg',
 2, 'ACTIVE', NOW(), 0),

('Top 10 điểm đến không thể bỏ qua khi du lịch Lào',
 'top-10-diem-den-khong-the-bo-qua-khi-du-lich-lao',
 'Danh sách những địa điểm đẹp nhất và ấn tượng nhất tại Lào mà bất kỳ du khách nào cũng nên ghé thăm ít nhất một lần trong đời.',
 'Lào là đất nước nhỏ bé nhưng ẩn chứa vô số điểm đến tuyệt vời, từ những thành phố cổ kính đến thiên nhiên hoang sơ. Dưới đây là 10 điểm đến không thể bỏ qua:\n\n1. LUANG PRABANG - Cố đô được UNESCO công nhận với hơn 30 ngôi chùa cổ kính và phố cổ quyến rũ.\n\n2. THÁC KUANG SI - Thác nước ba tầng với làn nước xanh ngọc bích tuyệt đẹp, cách Luang Prabang 29km.\n\n3. VIENTIANE - Thủ đô yên bình với Pha That Luang vàng rực và Patuxai uy nghi.\n\n4. VANG VIENG - Thiên đường phiêu lưu giữa núi đá vôi hùng vĩ với kayaking và hang động.\n\n5. SI PHAN DON (4000 ĐẢO) - Quần đảo huyền bí ở cực nam với thác Khone Phapheng và cá heo sông.\n\n6. PLAIN OF JARS (Cánh đồng Chum) - Di tích bí ẩn với hàng nghìn chum đá khổng lồ có niên đại 2000 năm.\n\n7. PAKSE - Cửa ngõ vào cao nguyên Bolaven với những đồn điền cà phê và thác nước tuyệt đẹp.\n\n8. WAT PHU - Đền thờ Hindu-Phật giáo cổ đại được UNESCO công nhận tại tỉnh Champasak.\n\n9. NONG KHIAW - Thị trấn nhỏ xinh đẹp bên sông Nam Ou với những vách đá vôi dựng đứng.\n\n10. MUANG NGOI - Làng quê yên bình không có điện lưới, lý tưởng để thoát khỏi cuộc sống hiện đại.',
 '/uploads/articles/2/thumbnail.jpg',
 2, 'ACTIVE', NOW(), 0),

('Những lưu ý quan trọng khi du lịch Lào dành cho người Việt',
 'nhung-luu-y-quan-trong-khi-du-lich-lao',
 'Tổng hợp những điều cần biết trước khi đặt chân đến Lào: văn hóa, phong tục, tiền tệ, sức khỏe và an toàn để có chuyến đi suôn sẻ.',
 'Để có một chuyến du lịch Lào thật sự trọn vẹn và tránh những rắc rối không đáng có, bạn cần nắm rõ một số điều quan trọng sau:\n\nVĂN HÓA VÀ PHONG TỤC:\n- Người Lào rất coi trọng tôn giáo. Khi vào chùa, cần ăn mặc kín đáo, bỏ giày dép trước cửa và không chỉ tay vào tượng Phật.\n- Không chạm vào đầu người khác vì đây được coi là bộ phận thiêng liêng nhất.\n- Tránh thể hiện tình cảm nơi công cộng.\n- Khi chào hỏi, người Lào dùng cử chỉ "Nop" (chắp tay trước ngực) thay vì bắt tay.\n\nTIỀN TỆ:\n- Đơn vị tiền tệ là Kip (LAK). 1 USD ≈ 21.000 kip, 1 VNĐ ≈ 0.45 kip.\n- Nên đổi tiền tại ngân hàng hoặc cửa hàng đổi tiền chính thức.\n- Nhiều nơi chấp nhận USD và Baht Thái.\n\nSỨC KHỎE:\n- Uống nước đóng chai, tránh nước máy.\n- Mang theo thuốc chống muỗi và kem chống nắng.\n- Nên tiêm phòng viêm gan A, thương hàn trước khi đi.\n\nAN TOÀN:\n- Lào là một trong những nước an toàn nhất Đông Nam Á.\n- Tuy nhiên vẫn cần cẩn thận với túi xách ở nơi đông người.\n- Không đi vào vùng nông thôn hẻo lánh một mình vào ban đêm.',
 '/uploads/articles/3/thumbnail.jpg',
 2, 'ACTIVE', NOW(), 0);
