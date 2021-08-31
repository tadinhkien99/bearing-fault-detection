import os
import natsort
import shutil
import time


class PrepareData:
    def __init__(self):
        # self.copying_data = 0
        # self.waiting_data = 1
        self.data_path = None
        self.data_length = None
        self.buffer_path = None
        self.index = None

    # Rename all file in folder
    # def rename(self):
    #     _files = os.listdir(self.data_path)
    #     _files = natsort.natsorted(_files)
    #     for _i in range(len(_files)):
    #         os.rename(os.path.join(self.data_path, _files[_i]), os.path.join(self.data_path, str(_i) + '.txt'))

    # Set folder data and buffer path
    def set_data_n_buffer_path(self, _data_path, _buffer_path):
        self.data_path = _data_path
        _files = os.listdir(self.data_path)
        self.data_length = len(_files)
        self.buffer_path = _buffer_path

    def simulate_buffer(self):
        _data_files = os.listdir(self.data_path)
        _buffer_files = os.listdir(self.buffer_path)
        _buffer_files = natsort.natsorted(_buffer_files)
        # take index in buffer_path
        _first_file = _buffer_files[0]
        self.index = int(_first_file[:-4])
        if self.index < len(_data_files):
            _data_files = natsort.natsorted(_data_files)
            _temp_file = os.path.join(self.data_path, _data_files[self.index])
            _buffer_files = os.listdir(self.buffer_path)
            # clear file data .txt in buffer_path before send data
            for file in _buffer_files:
                if file.endswith('.txt'):
                    os.remove(os.path.join(self.buffer_path, file))
                else:
                    pass
            shutil.copy(_temp_file, self.buffer_path)
            self.index += 1
            # return self.copying_data
        # else:
        #     return self.waiting_data


