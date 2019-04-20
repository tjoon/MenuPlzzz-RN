import numpy as np
import cv2
import requests
import queue
import os
import string

download_image_name = './image/problem.png'
first_preprocessed_name = './image/problem1.png'
after_bfs_dot_remove_name = './image/problem2.png'


class SiteHandler:
    def __init__(self):
        self.header = {'Cookie': 'WC=11322008-46660-q7rDf5v9FTew25Qq'}

    def init_site(self):
        print('init site!')
        requests.get('https://www.wechall.net/challenge/crackcha/reset.php', stream=True,
                     headers=self.header)

    def download_photo(self, name):
        file_path = '{}'.format(name)
        while True:
            try:
                print('down start_1')
                r = requests.get('http://www.wechall.net/challenge/crackcha/problem.php?', stream=True,
                                 headers=self.header)
                if r.status_code == 200:
                    print('down start_2')
                    with open(file_path, 'wb') as f:
                        for chunk in r:
                            print('down start_3')
                            f.write(chunk)
                break
            except:
                print('download fail. request again.')

    def get_right_answer(self):
        try:
            page = requests.get('https://www.wechall.net/challenge/crackcha/answer.php?answer=aaaaa',
                                headers=self.header).text
            answer = page.split('have been ')[1][:-1]
            return answer
        except:
            return -1

    def send_predicted_answer(self, answer):
        try:
            page = requests.get('https://www.wechall.net/challenge/crackcha/answer.php?answer={}'.format(answer),
                                headers=self.header).text
            return page
        except:
            return -1


class BfsDenoiser:
    def __init__(self):
        self.bfs_dict = {}
        self.cnt = 0

    def denoising_small_dot(self, img, each_image):
        for i in range(42):  # 작은 필요없는 점들을 없애기 위한 작업.
            for j in range(42):
                if img[i][each_image * 42 + j] == self.biggest_key:
                    img[i][each_image * 42 + j] = 0
                else:
                    img[i][each_image * 42 + j] = 255
        return img

    def is_grouping_success(self):
        if not self.bfs_dict:  # 글자가 하나씩 전부 지워지는 경우가 있음. 그런 경우 다시수집.
            return False
        self.biggest_key, self.biggest_value = map(int, max(self.bfs_dict.items(), key=lambda x: x[1]))
        if self.biggest_value < 40:  # 한 글자당 40개미만의 픽셀로 이루어져있으면 학습에 부적합하다고 생각해서 재수집.
            return False
        return True

    def grouping_with_bfs(self, img, each_image):
        for i in range(42):
            for j in range(42):
                if img[i][each_image * 42 + j] == 0:
                    self.bfs(img, i, each_image * 42 + j, each_image)
        return img

    def bfs(self, img, y, x, each_image):
        # global img
        self.cnt += 1
        img[y][x] = self.cnt
        self.bfs_dict[str(self.cnt)] = 1
        visited = [[0 for j in range(42 * (each_image + 1))] for i in range(42)]
        q = queue.Queue()
        q.put([y, x])
        visited[y][x] = 1
        while not q.empty():
            p = q.get()
            for i in range(8):
                ty, tx = p[0] + [1, 1, 1, 0, 0, -1, -1, -1][i], p[1] + [1, 0, -1, 1, -1, 1, 0, -1][i]
                if ty < 0 or tx < 0 or ty > 41 or tx > (each_image + 1) * 42 - 1:
                    continue
                if visited[ty][tx] == 0 and img[ty][tx] != 255:
                    q.put([ty, tx])
                    visited[ty][tx] = 1
                    img[ty][tx] = self.cnt
                    self.bfs_dict[str(self.cnt)] += 1


class ImageDataMaker:
    def __init__(self):
        self.sitehandler = SiteHandler()

    def make_empty_image(self, name, row, column):
        empty_png = np.zeros((42 * row, 42 * column))
        empty_png.fill(255)  # 흰색 바탕
        self.save_image(name, empty_png)

    def save_image(self, name, img):
        cv2.imwrite(name, img)

    def get_image_object(self, name):
        return cv2.imread(name, 0)

    def get_coordinate(self, name):
        if not os.path.exists(name):
            return -1, -1
        with open(name, 'r') as f:
            return map(int, f.readline().split(', '))

    def set_coordinate(self, name, y, x):
        with open(name, 'w') as f:
            f.write('{}, {}'.format(y, x))

    def is_data_collecting_finish(self, last_row):
        for character in string.ascii_uppercase:
            row, column = self.get_coordinate('./data/{}.txt'.format(character))
            if row != last_row:
                return False
        return True

    def write_character_to_empty_page(self, png_img, img, e, row, column):
        for i in range(42):
            for j in range(42):
                if img[i][e * 42 + j] != 255:
                    png_img[row * 42 + i][column * 42 + j] = img[i][e * 42 + j]
                else:
                    png_img[row * 42 + i][column * 42 + j] = 255
        return png_img

    def image_denoising(self, img):
        denoised_image = cv2.fastNlMeansDenoising(img, 10, 30, 2, 100)
        kernel = np.ones((2, 2), np.uint8)
        denoised_image = cv2.morphologyEx(denoised_image, cv2.MORPH_OPEN, kernel)
        return denoised_image

    def image_thresholding(self, img):
        ret, img = cv2.threshold(img, 120, 255, cv2.THRESH_BINARY)
        return img

    def preprocess_image(self, img):
        img = self.image_denoising(img)
        img = self.image_thresholding(img)
        return img

    def download_and_process_image(self):
        while True:
            self.sitehandler.download_photo(download_image_name)
            img = self.get_image_object(download_image_name)
            if img is None:
                print('download fail. download again')
                continue

            preprocessed_image = self.preprocess_image(img)  # 이미지를 받아와서 기본적인 전처리를 함.
            return preprocessed_image

            self.save_image(first_preprocessed_name, preprocessed_image)
            img = self.get_image_object(first_preprocessed_name)
            if img is None:
                print('None')
                continue

            fail_flag = False
            for each_image in range(5):  # 각각의 글자에 대해서 작업.
                bfs_denoiser = BfsDenoiser()
                img = bfs_denoiser.grouping_with_bfs(img, each_image)  # bfs로 점들을 그룹핑함.
                if not bfs_denoiser.is_grouping_success():
                    fail_flag = True
                    break

                img = bfs_denoiser.denoising_small_dot(img, each_image)

            if not fail_flag:
                self.save_image(after_bfs_dot_remove_name, img)
                return img

    def classify_and_save_image(self, answer, last_row, last_column):
        for e, each_character in enumerate(answer):
            character_png = './data/{}.png'.format(each_character)
            character_txt = './data/{}.txt'.format(each_character)
            if not os.path.exists(character_png):
                self.make_empty_image(character_png, last_row, last_column)
                self.set_coordinate(character_txt, 0, 0)

            row, column = self.get_coordinate(character_txt)
            if row > last_row - 1:
                print(e, each_character, 'already finish. continue!')
                continue

            png_img = self.get_image_object(character_png)
            img = self.get_image_object(after_bfs_dot_remove_name)
            png_img = self.write_character_to_empty_page(png_img, img, e, row, column)
            self.save_image(character_png, png_img)

            column += 1
            if column > last_column - 1:
                column = 0
                row += 1
            self.set_coordinate(character_txt, row, column)
            print('{} : {} {}'.format(each_character, row, column))

    def combine_all_images(self):
        result = './data/combined.png'
        self.make_empty_image(result, 20 * 26, 100)

        combined_image = []
        for character in string.ascii_uppercase:
            img = self.get_image_object('./data/{}.png'.format(character))
            if combined_image == []:
                combined_image = img
            else:
                combined_image = np.concatenate((combined_image, img))
        self.save_image(result, combined_image)


def main():
    datamaker = ImageDataMaker()
    datamaker.sitehandler.init_site()
    while True:
        datamaker.download_and_process_image()
        answer = datamaker.sitehandler.get_right_answer()
        if answer == -1:
            continue
        print(answer)

        last_row, last_column = 20, 100  # 10*100개의 이미지를 저장할거임.
        datamaker.classify_and_save_image(answer, last_row, last_column)
        if datamaker.is_data_collecting_finish(last_row):
            break

    datamaker.combine_all_images()


if __name__ == '__main__':
    main()
    